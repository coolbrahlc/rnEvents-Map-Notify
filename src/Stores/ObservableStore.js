import {observable} from 'mobx/lib/mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage';
import remotedev from 'mobx-remotedev';

// class ToDoItem {
//     @observable name;
//     @observable geoLocation;
//
//     constructor(name, geoLocation) {
//         this.name = name;
//         this.geoLocation = geoLocation;
//     }
// }

class ObservableListStore {
    @persist('list') @observable.shallow list = [];

    addListItem (item) {
        //const newToDo = new ToDoItem(item.name, item.geoLocation);
        this.list = [...this.list, item];
    }

    removeListItem (id) {
        this.list = this.list.filter((item, index) => id !== index)
    }

    editListItem(index, newData) {
        const listCopy = [...this.list];
        listCopy[index] = newData;
        this.list = listCopy
    }
}

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
});

const RemoteStore = remotedev(ObservableListStore);

// const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// };
// clearAsyncStorage().then( data => console.log('success'));

const listStore = new RemoteStore();
hydrate('some', listStore)
.then(() => console.log('someStore has been hydrated'))
.catch(err => console.log(err));

//export default remotedev(appStore);

export default listStore