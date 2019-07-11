import {observable, action, computed} from 'mobx/lib/mobx';
import { create, persist } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import remotedev from 'mobx-remotedev';
import { flow } from "mobx";
import ApolloClient from "apollo-boost";
import {insertToDo, fetchToDos, removeToDo, editToDo} from "../Utils/GraphqlQueries/Queries";
import config from '../Utils/config';
import {showToast} from '../Utils/ShowToast';

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

    addListItem = flow(function* (item) {
        try {
            const {data: {insert_todo_kmudrevskiy: {returning}}} = yield client.mutate({
                mutation: insertToDo,
                variables: item,
            });
            item.id = returning[0].id;
            this.list = [item, ...this.list];
            //this.notif.scheduleNotif(item);
        } catch (err) {
            showToast('Server not responding');
        }
    });

    fetchEvents = flow( function* () {
        this.isFetching = true;
        this.error = null;
        this.haveMore = true;
        try {
            const {data: {todo_kmudrevskiy}} = yield client.query({
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
            showToast('Server not responding');
        }
    });

    fetchMore = flow(function* () {
        if (!this.haveMore) {
            return null;
        }
        this.isFetching = true;
        this.error = null;
        try {
            const {data: {todo_kmudrevskiy}} = yield client.query({
                query: fetchToDos,
                variables: {
                    limit: config.LIMIT,
                    offset: this.list.length,
                },
                fetchPolicy: "network-only",
            });
            this.isFetching = false;
            if (todo_kmudrevskiy.length === 0) {
                this.haveMore = false;
            }
            this.list = [...this.list, ...todo_kmudrevskiy];
        } catch (err) {
            this.isFetching = false;
            this.error = err;
            showToast('Server not responding');
        }
    });

    removeListItem = flow(function* (id) {
        try {
            yield client.mutate({ // {data: {delete_todo_kmudrevskiy: {affected_rows}}}
                mutation: removeToDo,
                variables: {id},
            });
            this.list = this.list.filter(item => item.id !== id);
            showToast('Removed');
            // this.notif.removeSceduleNotif(id);
        } catch (e) {
            showToast('Server error');
        }
    });

    editListItem = flow(function* (reschedule, id, newData) {
        try {
            yield client.mutate({  // {data: {update_todo_kmudrevskiy: {affected_rows}}} = res
                mutation: editToDo,
                variables: {id, ...newData},
            });
            this.list = this.list.map(item => {
                if (item.id === id) {
                    return {...item, ...newData};
                }
                return item;
            });
            showToast('Edited');
            // if (reschedule) {
            //     this.notif.removeSceduleNotif(id);
            //     this.notif.scheduleNotif({id, ...newData});
            // }
        } catch (error) {
            showToast('Server error');
        }
    });
}

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
});

//const RemoteStore = remotedev(ToDosStore);

// const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// };
// clearAsyncStorage().then( data => console.log('success'));

//const ToDosStoreRemote = remotedev(ToDosStore, { name: 'Todo list', global: true });
const toDosStore = new ToDosStore();
// hydrate('listStore', listStore)
// .then(() => console.log('listStore has been hydrated'))
// .catch(err => console.log(err));

export default toDosStore;
