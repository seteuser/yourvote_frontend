import React, { Component } from 'react';
import Request from '../../API/Request';
import User from '../../custom-components/User';
import { COLOR_USER, CONTAINER } from '../../styles/common';
import { Button, Input, Loading } from '../../custom-components/Custom';
import { Alert, Text, FlatList, KeyboardAvoidingView } from 'react-native';

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = { filter: '', data: [], isLoading: true, refreshing: false }
  }

  componentDidMount = () => {
    Request.Validate()
    .then(response => {
      if(response == null){
        Alert.alert('Efetue o login novamente!');
        this.props.navigation.navigate('Start');
      }
    })
    .catch(error => Alert.alert(error));
    
    this.getUsers();
  };

  setField = (text, field) => this.setState({ [field]: text });

  getUsers = () => {
    Request.Get('Users')
    .then(response => {
      this.setState({ isLoading: false, dataSource: response, data: response, refreshing: false });
    })
    .catch(error => {
      this.setState({ isLoading: false, refreshing: false });
      console.warn(error);
    });
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => { this.getUsers(); });
  };

  deleteUser = (id) => {
    this.setState({ isLoading: true });
    Request.Delete('User', id)
    .then(response => {
      let updatedList = this.state.dataSource.filter((x, i) => x.userId != id);

      this.setState({
        isLoading: false, 
        dataSource: updatedList,
        data: updatedList
      });
      Alert.alert("Usuário excluido!");
    })
    .catch(error => {
      console.warn(error);
    });
  };

  optionsUserDialog = (item) => {
    Alert.alert(
      'O que deseja fazer com este usuário?',
      `Usuário: ${item.firstName}`,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Editar', onPress: () => { this.props.navigation.navigate('EditUser',{User: item})}},
        {text: 'Deletar', onPress: () => this.deleteUserConfirmationDialog(item)},
      ],
      { cancelable: false }
    )
  };

  deleteUserConfirmationDialog = (item) => {
    Alert.alert(
      'Deseja excluir este usuário?',
      `Usuário: ${item.firstName}`,
      [
        {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim', onPress: () => this.deleteUser(item.userId)},
      ],
      { cancelable: false }
    )
  };

  setSearchText = (searchText) => {
    this.setState({
      data: this.state.dataSource.filter(item => {
        const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()} ${item.email.toUpperCase()}`;
        return itemData.indexOf(searchText.toUpperCase()) > -1;
      })
    });
  }

  render() {
    
    if (this.state.isLoading) {
      return <Loading color={COLOR_USER} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">
        
        <Input 
          inputColor={COLOR_USER} 
          value={this.state.filter} 
          placeholder={'Filtro...'} 
          onChangeText={(text) => this.setSearchText(text)}
          autoCapitalize={'none'}
        />
        
        {(this.state.dataSource.length == 0) && <Text>Não há usuários cadastrados.</Text>}
        
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <User user={item} action={() => this.optionsUserDialog(item)} /> }
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

        <Button
          buttonColor={COLOR_USER} 
          action={() => this.props.navigation.navigate('NewUser')} 
          iconName={'md-person-add'} 
          buttonName={'Cadastrar Usuário'} 
        />

      </KeyboardAvoidingView>
    );
  }
}