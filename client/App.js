/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from "react-native"
import AllMessagesScreen from "./AllMessagesScreen.js"
import NewMessageScreen from "./NewMessageScreen.js"
import axios from "axios"

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Right, Title } from 'native-base';


class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {Messages: [], success: true, failed: false};
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.getMessagesFromServer = this.getMessagesFromServer.bind(this);
    this.getMessagesFromServer(0);
  }

  sendMessageToServer(messageName, messageContent){

    axios.post('http://10.0.2.2:8080/messages/newMessage', {
      name: messageName,
      content: messageContent,
      date: new Date()
    })
    .then((response) => {
      this.setState({success: true});
      this.setState({failed: false});
      console.log(response);
    })
    .catch((error) => {
      this.setState({failed: true});
      this.setState({success: false});
      console.log(error);
    });
  }

  getMessagesFromServer(selectedTab){
    
    if(selectedTab === 0){
      if(this.state.success){
        axios.get('http://10.0.2.2:8080/messages')
        .then((response) => {
          // handle success
          this.setState({Messages: response.data});
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

        this.setState({success: false});
        this.setState({failed: false});
  
      }
    }

  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Right><Title style={styles.header}>پیام ها</Title></Right>
        </Header>
        <Tabs onChangeTab={({i}) => this.getMessagesFromServer(i)}>
          <Tab style={{backgroundColor: 'red'}} heading={ <TabHeading><Icon name="chatbubbles" /><Text>همه پیام ها</Text></TabHeading>}>
            <AllMessagesScreen messages={this.state.Messages}/>
          </Tab>
          <Tab tabStyle={styles.tabs} heading={ <TabHeading><Icon name="add" /><Text>پیام جدید</Text></TabHeading>}>
            <NewMessageScreen onSubmit={this.sendMessageToServer} failed={this.state.failed} success={this.state.success}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});


export default App;
