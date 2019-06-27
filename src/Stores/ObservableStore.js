import {observable} from 'mobx/lib/mobx'


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
    @observable.shallow list = [
        {
            name: 'Walking in park',
            geoLocation: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
            },
        },
        {
            name: 'Sports in morning',
            geoLocation: {
                latitude: 37.78725,
                longitude: -122.4323,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
            },
        },
        {
            name: 'Sports in morning',
            geoLocation: {
                latitude: 37.78725,
                longitude: -122.4323,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
            },
        },
        {
            name: 'Sports in morning',
            geoLocation: {
                latitude: 37.78725,
                longitude: -122.4323,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
            },
        },
    ];
    //@observable inputText = '';

    addListItem (item) {
        //const newToDo = new ToDoItem(item.name, item.geoLocation);
        //console.log(newToDo.name)
        this.list = [...this.list, item];
    }

    removeListItem (id) {
        //this.list.splice(index, 1);
        this.list = this.list.filter((item, index) => id !== index)
    }

    editListItem(index, newName) {
        const listCopy = [...this.list];
        listCopy[index].name = newName;
        this.list = listCopy
    }
}


const listStore = new ObservableListStore();
export default listStore