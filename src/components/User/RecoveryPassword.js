import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_USER, CONTAINER } from '../../styles/common';
import { Input, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

export default class RecoveryPassword extends Component {
  static navigationOptions = {
    title: "Recuperar Senha",
  };

  constructor(props){
    super(props);
    this.state = { email: '', isLoading: false };
    this.initialState = this.state;
  }

  resetForm = () => this.setState(this.initialState);

  setField = (text, field) => this.setState({ [field]: text });

  RecoveryPassword(){
    if(this.state.email == ''){
      Alert.alert('Preencha o email para proseguir!');
      return;
    }

    this.setState({ isLoading: true });
    Request.RecoverPassword(this.state.email)
    .then(result => {
      Alert.alert(`Uma nova senha foi enviada para ${this.state.email}`);
      this.resetForm();
      this.props.navigation.navigate('Login');
    })
    .catch(error => {
      console.warn(error);
    })
  }

  render() {

    if (this.state.isLoading) {
      return	<Loading color={COLOR_USER} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Input 
          inputColor={COLOR_USER} 
          value={this.state.email} 
          placeholder={'E-mail'} 
          onChangeText={(text) => this.setField(text, 'email')} 
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />

        <Button 
          buttonColor={COLOR_USER} 
          action={this.RecoveryPassword.bind(this)} 
          iconName={'md-people'} 
          buttonName={'Enviar'} 
        />

      </KeyboardAvoidingView>
    );
  }
}