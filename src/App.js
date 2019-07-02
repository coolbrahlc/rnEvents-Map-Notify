import React, {Component, createContext} from 'react';
import Navigator from './Navigator/Navigator';
import {observer, Provider} from 'mobx-react/index'
import listStore from './Stores/ObservableStore';
import NotifService from "./Utils/NotifService";
import {Alert} from "react-native";


@observer
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.notif = new NotifService(this.onRegisterNotif, this.onNotif);
  }

  onRegisterNotif = (token) => {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  };

  onNotif = (notif) => {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  };

  render() {
    return (
        <Provider listStore={listStore} notif={this.notif}>
            <Navigator />
        </Provider>
    );
  }
}



export default App;

