import {observable} from 'mobx/lib/mobx'


class ObservableListStore {
    @observable list = [
        {name: 'Walking in park'},
        {name: 'Walking in park 1'},
        {name: 'Walking in park 2'},
        {name: 'Walking in park 3'},
        {name: 'Walking in park 4'},
    ];
    @observable inputText = '';

    addListItem (item) {
        this.list = [...this.list, item];
    }

    removeListItem (id) {
        //this.list.splice(index, 1);
        this.list = this.list.filter( (item, index) => {
            return id !== index
        })
    }

    editListItem(index, newName) {
        const listCopy = [...this.list];
        listCopy[index] = {name: newName};
        this.list = listCopy
    }
}


const listStore = new ObservableListStore();
export default listStore