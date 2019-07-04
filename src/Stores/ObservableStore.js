import {observable, action, computed} from 'mobx/lib/mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage';
import remotedev from 'mobx-remotedev';
import { flow } from "mobx";
import axios from 'axios';
import ApolloClient from "apollo-boost";
import {insertToDo, fetchToDos, removeToDo, editToDo} from "../Utils/GraphqlQueries/Queries"
import {ToastAndroid} from "react-native";

const client = new ApolloClient({
    uri: "http://10.1.1.127:8080/v1/graphql",
    headers: {
        "x-hasura-admin-secret": "1qaz2w3e4r"
    }
});


class ListStore {
    @persist('list') @observable.shallow list = [];
    @observable dog = null;
    @observable isFetching = false;
    @observable error = null;

    @action addListItem (notif, item) {
        client
        .mutate({
            mutation: insertToDo,
            variables: item,
        })
        .then(({data: {insert_todo_kmudrevskiy: {returning}}}) => {
            item.id = returning[0].id;
            notif.scheduleNotif(item);
            this.list = [...this.list, item];
        })
        .catch(err=> console.log(err));
    }

    @action fetchEvents () {
        this.isFetching = true;
        client
        .query({
            query: fetchToDos
        })
        .then(({data: {todo_kmudrevskiy}}) => {
            this.isFetching = false;
            this.list = todo_kmudrevskiy;
        })
        .catch(err=> {
            console.log(err);
            this.isFetching = false;
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
                this.list = this.list.filter(item => item.id !== id);
                ToastAndroid.show('Removed', ToastAndroid.LONG);
            }
        })
        .catch(err=> console.log(err));
    }

    @action editListItem(id, newData) {
        client
        .mutate({
            mutation: editToDo,
            variables: {id, ...newData},
        })
        .then(({data: {update_todo_kmudrevskiy: {affected_rows}}}) => {
            if (affected_rows === 1) {
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

const RemoteStore = remotedev(ListStore);

// const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// };
// clearAsyncStorage().then( data => console.log('success'));

const listStore = new RemoteStore();
// hydrate('listStore', listStore)
// .then(() => console.log('listStore has been hydrated'))
// .catch(err => console.log(err));

//export default remotedev(appStore);

export default listStore