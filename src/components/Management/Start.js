import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_PRIMARY, STYLE_TEXT, CONTAINER } from '../../styles/common';
import { Button, Input, Link } from '../../custom-components/Custom';
import { Text, KeyboardAvoidingView, Alert } from 'react-native';

export default class Start extends Component {

  constructor(props){
    super(props);
    this.state = { token: '' };
  }

  GetCandidates(){
    if(this.state.token !== null && this.state.token !== ''){
      Request.GetItemInStorage(this.state.token).then(result => {
        if(this.state.token == result)
          Alert.alert("Token já utilizado!");        
        else
          this.props.navigation.navigate('Candidates', {token: this.state.token});        
      });
    }
    else{
      Alert.alert('Token inválido!');
    }
  }


  setField = (text, field) => this.setState({ [field]: text });

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Text style={STYLE_TEXT}>Your Vote</Text>

        <Input
          autoFocus
          inputColor={COLOR_PRIMARY}
          value={this.state.token}
          placeholder={'Informe seu Token...'} 
          onChangeText={(text) => this.setField(text, 'token')}
          autoCapitalize={'characters'}
        />

        <Button
          inputColor={COLOR_PRIMARY}
          action={() => this.GetCandidates()} 
          iconName={'ios-log-in'}
          buttonName={'INICIAR'}
        />

        <Link action={() => navigate('LostToken')} text={'Perdeu seu Token?'} />
        <Link action={() => navigate('Login')} text={'Administrador'} />

      </KeyboardAvoidingView>
    );
  }
}