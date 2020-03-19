import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_USER, CONTAINER } from '../../styles/common';
import { Input, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

const initialState = {};

export default class EditUser extends Component {

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const user = params ? params.User : null;

    this.state = {
      isLoading: false,
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: '',
      newPassword: '',
    };
  }

  resetForm = () => this.setState(initialState);
  
  setField = (text, field) => this.setState({ [field]: text });

  EditUser() {
    this.setState({ isLoading: true });

    const name = this.state.name;

    const user = {
      userId: this.state.userId,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      email: this.state.email.toLowerCase(),
      password: this.state.password || ''
    };

    Request.Update('User', user)
    .then((response) => {
      this.resetForm();          
      Alert.alert(`Usuário Atualizado!`);
      this.props.navigation.navigate('Users');
    })
    .catch((error) => {
      this.setState({ isLoading: false });
      Alert.alert(`Erro: ${error}`);
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
          placeholder={'Nome'} 
          onChangeText={(text) => this.setField(text, 'name')} 
          autoCapitalize={'words'}
        />

        
        <Input 
          inputColor={COLOR_USER} 
          value={this.state.email} 
          placeholder={'E-mail'} 
          onChangeText={(text) => this.setField(text, 'email')} 
          editable={false}
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

        <Input 
          inputColor={COLOR_USER} 
          value={this.state.newPassword} 
          placeholder={'Nova Senha'} 
          onChangeText={(text) => this.setField(text, 'newPassword')} 
          secureTextEntry
        />

        <Button 
          buttonColor={COLOR_USER} 
          action={this.EditUser.bind(this)} 
          iconName={'ios-refresh'} 
          buttonName={'Atualizar'} 
        />
        
      </KeyboardAvoidingView>
    );
  }
}