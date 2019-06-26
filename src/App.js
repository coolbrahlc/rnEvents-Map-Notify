import React, {Component, createContext} from 'react';
import Navigator from './Navigator/Navigator';
import {observer, Provider} from 'mobx-react/index'
import listStore from './Stores/ObservableStore';


@observer
class App extends Component<Props> {

  render() {
    return (
        <Provider listStore={listStore}>
            <Navigator/>
        </Provider>
    );
  }
}



export default App;

