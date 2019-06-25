import {observable} from 'mobx'

let index = 0;

class ObservableListStore {
    @observable list = [
        {key: 'Walking in park'},
    ];

    addListItem (item) {
        this.list = [...this.list, item];
        index++
    }

    removeListItem (id) {
        //this.list.splice(index, 1);
        this.list = this.list.filter( (item, index) => {
            return id !== index
        })
    }

    editListItem(index, newName) {
        const listCopy = [...this.list];
        listCopy[index] = {key: newName};
        this.list = listCopy
    }
}


const observableListStore = new ObservableListStore();
export default observableListStore