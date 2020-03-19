import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_MEMBER, CONTAINER } from '../../styles/common';
import { Input, InputDate, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

export default class NewMember extends Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    const userId = params ? params.userId : null;

    this.state = {
      isLoading: false,
      userId: userId,
      name: '',
      image: '',
      description: '',
      email: '',
      birthday: ''
    };

    this.initialState = this.state;    
  }

  componentDidMount() {
    let user = {};
    
    Request.GetItemInStorage('user')
    .then(response => user = response)
    .catch(error => console.warn(error));
    
    if(this.state.userId == null)
      this.setState({ userId: user.userId });
  }

  resetForm = () => this.setState(this.initialState);
  capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  setField = (text, field) => this.setState({ [field]: text });

  NewMember() {
    this.setState({ isLoading: true });

    const name = this.state.name;

    const member = {
      userId: this.state.userId,
      image: null,
      firstName: this.capitalizeFirstLetter(name.split(' ')[0]),
      lastName: this.capitalizeFirstLetter(name.split(' ')[1]),
      email: this.state.email.toLowerCase(),
      description: this.state.description,
      birthday: this.state.birthday,
      active: true
    };

    Request.Post('Member', 'Save', member)
    .then((response) => {
      this.resetForm();
      Alert.alert(`Membro Cadastrado!`);
      this.props.navigation.goBack();
    })
    .catch((error) => {
      this.setState({ isLoading: false });
      console.warn(`Erro: ${error}`);
    });
  };

  render() {
    
    if (this.state.isLoading) {
      return	<Loading color={COLOR_MEMBER} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">
                
        <Input 
          inputColor={COLOR_MEMBER} 
          value={this.state.name} 
          placeholder={'Nome e Sobrenome'} 
          onChangeText={(text) => this.setField(text, 'name')} 
          autoCapitalize={'words'}
        />

        <Input 
          inputColor={COLOR_MEMBER} 
          value={this.state.email} 
          placeholder={'E-mail'} 
          onChangeText={(text) => this.setField(text, 'email')}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />

        <Input 
          inputColor={COLOR_MEMBER} 
          value={this.state.description} 
          placeholder={'Descrição'} 
          onChangeText={(text) => this.setField(text, 'description')}
          autoCapitalize={'sentences'}
        />

        <InputDate 
          inputColor={COLOR_MEMBER}
          date={this.state.birthday}
          placeholder={'Data de Nascimento'}
          onChange={(text) => this.setField(text, 'birthday')}
        />

        <Button
          buttonColor={COLOR_MEMBER}
          action={this.NewMember.bind(this)}
          iconName={'ios-checkmark-circle-outline'}
          buttonName={'Salvar'}
        />

      </KeyboardAvoidingView>
    );
  }
}