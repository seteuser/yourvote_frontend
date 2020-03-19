import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_MEMBER, CONTAINER } from '../../styles/common';
import { Input, InputDate, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

const initialState = {};

export default class EditMember extends Component {
  
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const member = params ? params.member : null;

    this.state = {
      isLoading: false,
      userId: member.userId,
      image: member.image,
      memberId: member.memberId,
      name: `${member.firstName} ${member.lastName}`,
      email: member.email,
      description: member.description,
      birthday: new Date(member.birthday)
    };
  }

  resetForm = () => this.setState(initialState);
  
  setField = (text, field) => this.setState({ [field]: text });

  EditMember() {
    this.setState({ isLoading: true });

    const name = this.state.name;

    const member = {
      memberId: this.state.memberId,
      userId: this.state.userId,
      image: this.state.image,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      email: this.state.email,
      description: this.state.description || '',
      birthday: this.state.birthday || new Date()
    };

    Request.Update('Member', member)
    .then(response => {
      this.resetForm();
      Alert.alert(`Membro Atualizado!`);
      this.props.navigation.goBack();
    })
    .catch((error) => {
      this.setState({ isLoading: false });
      Alert.alert(error);
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
          action={this.EditMember.bind(this)}
          iconName={'ios-refresh'}
          buttonName={'Atualizar'}
        />
      </KeyboardAvoidingView>
    );
  }
}