import React, { Component } from 'react';
import Request from '../../API/Request';
import { Button } from '../../custom-components/Custom';
import { Text, KeyboardAvoidingView } from 'react-native';
import { COLOR_USER, COLOR_MEMBER, COLOR_SESSION, COLOR_TESTS, STYLE_TEXT, CONTAINER } from '../../styles/common';

export default class Dashboard extends Component {

  Logout(){
    Request.SetItemInStorage("user", null);
    this.props.navigation.navigate("Start");
  }

  render() {
    const user = this.props.navigation.state.params.user;
    const navigate = this.props.navigation.navigate;

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">
        
        <Text style={STYLE_TEXT}>Bem-vindo {user.firstName}</Text>
        
        <Button 
          buttonColor={COLOR_USER} 
          action={() => navigate('Users')} 
          iconName={'md-people'} 
          buttonName={'Usuários'} 
        />

        <Button 
          buttonColor={COLOR_MEMBER}
          action={() => navigate('Members', {userId: user.userId})}
          iconName={'md-contacts'} 
          buttonName={'Membros'} 
        />
        
        <Button
          buttonColor={COLOR_SESSION} 
          action={() => navigate('Sessions', {userId: user.userId})} 
          iconName={'ios-ribbon'} 
          buttonName={'Sessões'} 
        />

        <Button 
          buttonColor={COLOR_TESTS} 
          action={() => navigate('Teste')} 
          iconName={'ios-code'} 
          buttonName={'Testes'} 
        />

        {/* <Button 
          buttonColor={COLOR_TESTS} 
          action={() => navigate('SessionManager')} 
          iconName={'ios-code'} 
          buttonName={'Teste Session'} 
        /> */}

        <Button 
          buttonColor={'#000000'}
          action={() => this.Logout()} 
          iconName={'ios-log-out'} 
          buttonName={'Sair'} 
        />

      </KeyboardAvoidingView>
    );
  }
}