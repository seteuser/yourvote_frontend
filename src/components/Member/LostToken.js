import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from '../../custom-components/Custom';
import { COLOR_MEMBER, CONTAINER } from '../../styles/common';

const recoveryToken = (email) => {
  if(email == ''){
    Alert.alert('Preencha o email para proseguir!');
    return;
  }
  
  Alert.alert("Novo Token Enviado para seu email!");
};

export default class Start extends Component {

  constructor(props){
    super(props);
    this.state = { email: '' };
  }

  render() {
    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Input 
          inputColor={COLOR_MEMBER} 
          value={this.state.email} 
          placeholder={'Informe seu Email...'} 
          onChangeText={(text) => this.setField(text, 'name')} 
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />

        <Button 
          buttonColor={COLOR_MEMBER} 
          action={recoveryToken(this.state.email)} 
          iconName={'md-people'} 
          buttonName={'Enviar'} 
        />

      </KeyboardAvoidingView>
    );
  }
}