import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_SESSION, CONTAINER } from '../../styles/common';
import { Input, InputDate, Button, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from 'react-native';

const initialState = {};

export default class EditSession extends Component {

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const session = params ? params.session : null;

    this.state = {
      isLoading: false,
      userId: session.userId,
      title: session.title,
      description: session.description,
      startDate: new Date(session.interval.startDate),
      endDate: new Date(session.interval.endDate)
    };
  }

  resetForm = () => this.setState(initialState);
  setField = (text, field) => this.setState({ [field]: text });

  EditSession() {    
    this.setState({ isLoading: true });

    const sessionBody = {
      userId: this.state.userId,
      image: this.state.image,
      title: this.state.title,
      description: this.state.description,
      interval: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      },
      members: []
    };

    Request.Update('Session', sessionBody)
    .then(response => {
      this.resetForm();
      Alert.alert(`Sessão atualizada!`);
      this.props.navigation.goBack();
    })
    .catch(error => {
      this.setState({ isLoading: false });
      console.warn(error);
      Alert.alert(`Erro: ${error}`);
    })
  };

  render() {

    if (this.state.isLoading) {
      return	<Loading color={COLOR_SESSION} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">
        
        <Input 
          inputColor={COLOR_SESSION} 
          value={this.state.title} 
          placeholder={'Título'} 
          onChangeText={(text) => this.setField(text, 'title')} 
          autoCapitalize={'words'}
        />

        <Input 
          inputColor={COLOR_SESSION} 
          value={this.state.description} 
          placeholder={'Descrição'} 
          onChangeText={(text) => this.setField(text, 'description')}
          autoCapitalize={'sentences'}
        />

        <InputDate 
          inputColor={COLOR_SESSION}
          date={this.state.startDate}
          placeholder={'Data Inicial'}
          onChange={(text) => this.setField(text, 'startDate')}
        />

        <InputDate 
          inputColor={COLOR_SESSION}
          date={this.state.endDate}
          placeholder={'Data Final'}
          onChange={(text) => this.setField(text, 'endDate')}
        />

        <Button
          buttonColor={COLOR_SESSION}
          action={this.EditSession.bind(this)}
          iconName={'ios-refresh'}
          buttonName={'Atualizar'}
        />
        
      </KeyboardAvoidingView>
    );
  }
}