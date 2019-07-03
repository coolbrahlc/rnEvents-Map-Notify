import {observable, action, computed} from 'mobx/lib/mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage';
import remotedev from 'mobx-remotedev';
import { flow } from "mobx";
import axios from 'axios';

// class ToDoItem {
//     @observable name;
//     @observable geoLocation;
//
//     constructor(name, geoLocation) {
//         this.name = name;
//         this.geoLocation = geoLocation;
//     }
// }

class ListStore {
    @persist('list') @observable.shallow list = [];
    @observable dog = null;
    @observable isFetching = false;
    @observable error = null;

    // @observable length = 2;
    // @computed get squared() {
    //     return this.length * this.length;
    // }
    // set squared(value) { //this is automatically an action, no annotation necessary
    //     this.length = Math.sqrt(value);
    // }

    @action addListItem (item) {
        //const newToDo = new ToDoItem(item.name, item.geoLocation);
        this.list = [...this.list, item];
    }

    @action removeListItem (id) {
        this.list = this.list.filter((item, index) => id !== index)
    }

    @action editListItem(index, newData) {
        const listCopy = [...this.list];
        listCopy[index] = newData;
        this.list = listCopy
    }

    loadImage = flow(function* (loader=true) {
        this.error = null;
        if (loader){
            this.isFetching = true;
        }
        try {
            const {data: {message}} = yield axios.get(`https://dog.ceo/api/breeds/image/random`);
            this.isFetching = false;
            this.dog = message;
        } catch (error) {
            console.log(error, 'err')
            this.isFetching = false;
            this.error = "error"
        }
    });
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
hydrate('listStore', listStore)
.then(() => console.log('listStore has been hydrated'))
.catch(err => console.log(err));

//export default remotedev(appStore);

export default listStore