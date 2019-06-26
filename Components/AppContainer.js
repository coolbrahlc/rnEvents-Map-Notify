// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, TextInput, View, Button, FlatList, Alert} from 'react-native';
// import ListItem from './../Components/ListItem';
// import {observer, inject} from 'mobx-react'
// import observableListStore from './../Stores/ObservableStore';
//
// // const instructions = Platform.select({
// //   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
// //   android:
// //     'Double tap R on your keyboard to reload,\n' +
// //     'Shake or press menu button for dev menu',
// // });
// const LIGHT_GRAY = "#D3D3D3";
//
// type Props = {};
//
// //@inject('observableListStore')
// @observer
// class AppContainer extends Component<Props> {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             text: '',
//         };
//     }
//
//     onPressSubmit = () =>{
//         const {text} = this.state;
//         //const {observableListStore} = this.props;
//
//         if (text) {
//             observableListStore.addListItem({key: text})
//         }
//     };
//
//
//     render() {
//         //const {observableListStore} = this.props;
//         console.log(this.props, '5555');
//         return (
//                 <View style={styles.container}>
//                     <TextInput
//                         style={{height: 40, margin: 10}}
//                         placeholder="Add event"
//                         onChangeText={(text) => this.setState({text})}
//                         value={this.state.text}
//                         underlineColorAndroid={LIGHT_GRAY}
//                     />
//                     <View style={{alignItems: 'flex-start', padding: 10}}>
//                         <Button
//                             onPress={this.onPressSubmit}
//                             title="Add event"
//                             color="#841584"
//                             accessibilityLabel="Learn more about this purple button"
//                         />
//                     </View>
//                     <FlatList
//                         data={observableListStore.list}
//                         renderItem={({item, index}) => <ListItem name={item.key} id={index}/>}
//                     />
//                 </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         flexDirection: 'column',
//         paddingTop: 22,
//         backgroundColor: '#EAEDF2',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// });
//
// export default AppContainer;
//
// /*const stylesOld = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });*/
