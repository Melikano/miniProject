
import React from "react"
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'


class Message extends React.Component {
    render() {
        return (
            <ListItem>
                <Left>
                    <Text note>{this.props.message.date}</Text>
                </Left>
                <Body>
                    <Text>{this.props.message.name}</Text>
                    <Text note>{this.props.message.content}</Text>
                </Body>
            </ListItem>
        );
      }
}

export default Message