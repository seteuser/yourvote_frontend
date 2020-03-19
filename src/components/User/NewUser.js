import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_USER, CONTAINER } from '../../styles/common';
import { Input, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

export default class NewUser extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: '',
      email: '',
      password: ''
    };

    this.initialState = this.state;
  }

  resetForm = () => this.setState(this.initialState);
  setField = (text, field) => this.setState({ [field]: text });

  NewUser() {
    this.setState({ isLoading: true });
    
    const name = this.state.name;

    const user = {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };

    Request.Post('User', 'Save', user)
    .then(response => {
      this.resetForm();      
      Alert.alert(`Usuário Cadastrado!`);
      this.props.navigation.navigate('Users');
    })
    .catch(error => {
      this.setState({ isLoading: false });
      console.warn(`Erro: ${error}`);
    });
  };

  render() {

    if (this.state.isLoading) {
      return	<Loading color={COLOR_USER} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Input 
          inputColor={COLOR_USER} 
          value={this.state.name} 
          placeholder={'Nome e Sobrenome'} 
          onChangeText={(text) => this.setField(text, 'name')}
          autoCapitalize={'words'}
        />

        <Input 
          inputColor={COLOR_USER} 
          value={this.state.email} 
          placeholder={'E-mail'} 
          onChangeText={(text) => this.setField(text, 'email')} 
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />

        <Input 
          inputColor={COLOR_USER} 
          value={this.state.password} 
          placeholder={'Senha'} 
          onChangeText={(text) => this.setField(text, 'password')} 
          secureTextEntry 
        />

        <Button 
          buttonColor={COLOR_USER} 
          action={this.NewUser.bind(this)} 
          iconName={'ios-checkmark-circle-outline'} 
          buttonName={'Salvar'} 
        />

      </KeyboardAvoidingView>
    );
  }
}