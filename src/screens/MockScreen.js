import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addMessage, getMessage } from '../redux/actions/messageActions';

export class MockScreen extends Component {
    state = {
        message: '',
        listOfMessages: {}
    };
    componentDidMount(){
        this.props.getMessage();
    }

    componentWillReceiveProps(props){
        this.setState({ listOfMessages: props.messages });
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={(text) => this.setState({ message: text })} />
                <TouchableHighlight onPress={() => addMessage(this.state.message)}>
                    <Text>Presioname para enviar tu mensaje</Text>
                </TouchableHighlight>
                <Text style={{ marginTop: 5, fontSize: 40 }}>Lista de mensajes</Text>
                {this.state.listOfMessages && Object.keys(this.state.listOfMessages).map((messageKey) => (
                    <Text>{this.state.listOfMessages[messageKey]}</Text>
                ))}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        messages: state.messageReducer.messages
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: () => getMessage()(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MockScreen);
