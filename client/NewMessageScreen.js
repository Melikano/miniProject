
import React from 'react';
import {StyleSheet} from "react-native"
import { Dimensions } from "react-native";
import { Container, Content, Form, Item, Input, Textarea, Button, Text, Icon} from 'native-base';

class NewMessageScreen extends React.Component {

  constructor(props){

    super(props);
    this.state = {MessageName: '', MessageContent: '', result: <Text></Text>};
    this.onSubmit = this.onSubmit.bind(this);

  }


  onSubmit(e){
    if(this.state.MessageName.length === 0){
      this.setState({result: <Text style={{margin: 20}}>لطفا نام را وارد کنید</Text>});
      return;
    }
    this.props.onSubmit(this.state.MessageName, this.state.MessageContent);
    if(this.props.success){
      this.setState({result: <Text style={{margin: 20}}>پیام شما با موفقیت ارسال شد</Text>});
    }else if(this.props.failed){
      this.setState({result: <Text style={{margin: 20}}>خطا در ارسال پیام</Text>});
    }else {
      this.setState({result: <Text></Text>});
    }
    this.setState({MessageName: '', MessageContent: ''})
  }


  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form} >
            <Item style={styles.inputItem} rounded bordered>
              <Input value={this.state.MessageName} rounded placeholder="نام" 
              onChangeText={(text) => {this.setState({MessageName: text})}}/>
            </Item>
            <Item style={styles.textAreaItem} rounded bordered>
              <Textarea style={styles.textArea} rowSpan={8}
              onChangeText={(text) => {this.setState({MessageContent: text});}} 
              value={this.state.MessageContent} placeholder="متن پیام" />
            </Item>
            <Item last style={styles.buttonItem}>
              <Button style={styles.button} rounded onPress={this.onSubmit}>
                <Icon style={styles.icon} name="paper-plane" />
                <Text style={styles.buttonText}>ارسال</Text>
              </Button>
            </Item>

            {this.state.result}

          </Form>
        </Content>
      </Container>
    );
  }
}
var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  form: { 
    alignItems: "center"
  },
  inputItem: {
    padding: 10, 
    width: "90%", 
    marginTop: 20, 
    margin: 10, 
    backgroundColor: 'whitesmoke'
  },
  textAreaItem: {
    padding: 10, 
    width: "90%", 
    margin: 10, 
    backgroundColor: 'whitesmoke'
  },
  textArea: { 
    width: width, 
    paddingRight: 70
  },
  buttonItem: {
    padding: 10, 
    borderBottomWidth: 0, 
    margin: 10 
  },
  button: {
    width: 120, 
    alignContent: "center"
  },
  icon: {
    paddingLeft: 15
  },
  buttonText: {
    fontSize: 20, 
    marginRight: 15
  }

});



  export default NewMessageScreen