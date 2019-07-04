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

    // client = new ApolloClient({
    //     uri: config.GRAPHQL_URI,
    //     headers: {
    //         "x-hasura-admin-secret": config.GRAPHQL_SECRET,
    //     }
    // });

    @action addListItem (item) {
        client
        .mutate({
            mutation: insertToDo,
            variables: item,
        })
        .then(({data: {insert_todo_kmudrevskiy: {returning}}}) => {
            item.id = returning[0].id;
            this.notif.scheduleNotif(item);
            this.list = [...this.list, item];
        })
        .catch(err=> console.log(err));
    }

    @action fetchEvents (fromStart=false) {
        if (this.list.length%8 !== 0 ) {
            return null
        }
        this.isFetching = !fromStart && true;
        this.error = null;
        client
        .query({
            query: fetchToDos,
            variables: {
                limit: 8,
                offset: fromStart ? 0: this.list.length
            },
            fetchPolicy: "network-only",
        })
        .then(({data: {todo_kmudrevskiy}}) => {
            this.isFetching = false;
            if (fromStart) {
                this.list = todo_kmudrevskiy;
            } else {
                this.list = [...this.list, ...todo_kmudrevskiy];
            }
        })
        .catch(err=> {
            console.log(err);
            this.isFetching = false;
            this.error = true;
            ToastAndroid.show('Server not responding', ToastAndroid.LONG);
        });

    }

    @action removeListItem (id) {
        client
        .mutate({
            mutation: removeToDo,
            variables: {id},
        })
        .then(({data: {delete_todo_kmudrevskiy: {affected_rows}}}) => {
            if (affected_rows === 1) {
                this.notif.removeSceduleNotif(id);
                this.list = this.list.filter(item => item.id !== id);
                ToastAndroid.show('Removed', ToastAndroid.LONG);
            }
        })
        .catch(err=> console.log(err));
    }

    @action editListItem(reschedule, id, newData) {
        client
        .mutate({
            mutation: editToDo,
            variables: {id, ...newData},
        })
        .then(({data: {update_todo_kmudrevskiy: {affected_rows}}}) => {
            if (affected_rows === 1) {
                if (reschedule) {
                    this.notif.removeSceduleNotif(id);
                    this.notif.scheduleNotif({id, ...newData});
                }
                this.list = this.list.map(item =>{
                    if (item.id === id) {
                        return {...item, ...newData}
                    }
                    return item
                });
                ToastAndroid.show('Edited', ToastAndroid.LONG);
            }
        })
        .catch(err=> console.log(err));
    }

    // loadImage = flow(function* (loader=true) {
    //     this.error = null;
    //     if (loader){
    //         this.isFetching = true;
    //     }
    //     try {
    //         const {data: {message}} = yield axios.get(`https://dog.ceo/api/breeds/image/random`);
    //         this.isFetching = false;
    //         this.dog = message;
    //     } catch (error) {
    //         console.log(error, 'err')
    //         this.isFetching = false;
    //         this.error = "error"
    //     }
    // });
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