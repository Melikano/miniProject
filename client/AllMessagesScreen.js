
import React from "react"
import { Container, Header, Content, List} from 'native-base'
import { FlatList, Text } from "react-native";

import Message from "./Message.js"


class AllMessagesScreen extends React.Component {
    render() {
      var messages = this.props.messages;
      var noMessages = <Text></Text>;
      if(messages.length === 0){
        noMessages = <Text style={{margin: 50}}>هیچ پیامی موجود نیست</Text>
      }
      return (
        <Container>
          <Content>
            {noMessages}
            <List>
              <FlatList data={messages}
                        renderItem={({item}) => <Message message={item}/>} /> 
            </List>
          </Content>
      </Container>
      );
      }
}

export default AllMessagesScreen