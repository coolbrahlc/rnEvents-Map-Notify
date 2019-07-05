import {observable, action, computed} from 'mobx/lib/mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage';
import remotedev from 'mobx-remotedev';
import { flow } from "mobx";
import axios from 'axios';
import ApolloClient from "apollo-boost";
import {insertToDo, fetchToDos, removeToDo, editToDo} from "../Utils/GraphqlQueries/Queries"
import {ToastAndroid} from "react-native";
import config from '../Utils/config'

const client = new ApolloClient({
    uri: config.GRAPHQL_URI,
    headers: {
        "x-hasura-admin-secret": config.GRAPHQL_SECRET,
    }
});



class ToDosStore {
    @persist('list') @observable.shallow list = [];
    @observable dog = null;
    @observable isFetching = false;
    @observable error = null;
    haveMore = true;

    @action addListItem (item) {
        client
        .mutate({
            mutation: insertToDo,
            variables: item,
        })
        .then(({data: {insert_todo_kmudrevskiy: {returning}}}) => {
            item.id = returning[0].id;
            this.notif.scheduleNotif(item);
            this.list = [item, ...this.list];
        })
        .catch(err=> console.log(err));
    }

    @action async fetchEvents () {
        this.isFetching = true;
        this.error = null;
        this.haveMore = true;
        try {
            const {data: {todo_kmudrevskiy}} = await client.query({
                query: fetchToDos,
                variables: {
                    limit: config.LIMIT,
                    offset: 0
                },
                fetchPolicy: "network-only",
            });
            this.isFetching = false;
            this.list = todo_kmudrevskiy;
        } catch (err) {
            this.isFetching = false;
            this.error = err;
            ToastAndroid.show('Server not responding', ToastAndroid.LONG);
        }
    }

    @action async fetchMore () {
        if (!this.haveMore) {
            return
        }
        this.isFetching = true;
        this.error = null;
        try {
            const {data: {todo_kmudrevskiy}} = await client.query({
                query: fetchToDos,
                variables: {
                    limit: config.LIMIT,
                    offset: this.list.length,
                },
                fetchPolicy: "network-only",
            });
            this.isFetching = false;
            if (todo_kmudrevskiy.length === 0) {
                this.haveMore = false
            }
            this.list = [...this.list, ...todo_kmudrevskiy];
        } catch (err) {
            this.isFetching = false;
            this.error = err;
            ToastAndroid.show('Server not responding', ToastAndroid.LONG);
        }
    }

    @action async removeListItem (id) {
        try {
            const {data: {delete_todo_kmudrevskiy: {affected_rows}}} = await client.mutate({
                mutation: removeToDo,
                variables: {id},
            });
            if (affected_rows === 1) {
                this.notif.removeSceduleNotif(id);
                this.list = this.list.filter(item => item.id !== id);
                ToastAndroid.show('Removed', ToastAndroid.LONG);
            }
        } catch (e) {
            console.log(e)
        }
    }

    editListItem = flow(function* (reschedule, id, newData) {
        try {
            const res = yield client.mutate({
                mutation: editToDo,
                variables: {id, ...newData},
            });
            const {data: {update_todo_kmudrevskiy: {affected_rows}}} = res;
            if (affected_rows === 1) {
                if (reschedule) {
                    this.notif.removeSceduleNotif(id);
                    this.notif.scheduleNotif({id, ...newData});
                }
                this.list = this.list.map(item => {
                    if (item.id === id) {
                        return {...item, ...newData}
                    }
                    return item
                });
                ToastAndroid.show('Edited', ToastAndroid.LONG);
            }
        } catch (error) {
            console.log(error);
        }
    });
}

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
});

const RemoteStore = remotedev(ToDosStore);

// const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// };
// clearAsyncStorage().then( data => console.log('success'));

const toDosStore = new RemoteStore();
// hydrate('listStore', listStore)
// .then(() => console.log('listStore has been hydrated'))
// .catch(err => console.log(err));

//export default remotedev(appStore);

export default toDosStore