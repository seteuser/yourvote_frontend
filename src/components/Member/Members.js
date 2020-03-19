import React, { Component } from 'react';
import Request from '../../API/Request';
import Member from '../../custom-components/Member';
import { COLOR_MEMBER, CONTAINER } from '../../styles/common';
import { Input, Button, Loading } from '../../custom-components/Custom';
import { Alert, Text, FlatList, KeyboardAvoidingView } from 'react-native';

export default class Members extends Component {

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const userId = params ? params.userId : null;

    this.state = {
      userId: userId,
      filter: '',
      isLoading: true, 
      refreshing: false,
      dataSource: [],
      data: []
    }
  }

  setField = (text, field) => this.setState({ [field]: text });

  componentDidMount() {
    Request.Validate()
    .then(response => {
      if(response == null){
        Alert.alert('Efetue o login novamente!');
        this.props.navigation.navigate('Start');
      }
    })
    .catch(error => Alert.alert(error));

    Request.GetItemInStorage('user')
    .then(response => {
      let user = response;
      
      if(this.state.userId == null)
        this.setState({ userId: user.userId });
      
      this.getMembers();
    })
    .catch(error => Alert.alert(error));
  }

  getMembers = () => {
    Request.Get('Members', null, `userId=${this.state.userId}`)
    .then(response => {
      this.setState({ isLoading: false, dataSource: response, data: response, refreshing: false });
    })
    .catch(error => {
      this.setState({ isLoading: false, refreshing: false });
      Alert.alert(error);
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => { this.getMembers(); });
  };

  deleteMember = (id) => {
    this.setState({ isLoading: true });

    Request.Delete('Member', id)
    .then(response => {
      let updatedList = this.state.dataSource.filter((x, i) => x.memberId != id);

      this.setState({ 
        isLoading: false, 
        dataSource: updatedList,
        data: updatedList
      });
      Alert.alert("Membro excluido!");
    })
    .catch(error => {
      Alert.alert(error);
    });
  };

  optionsMemberDialog = (item) => {
    Alert.alert(
      'O que deseja fazer com este membro?',
      `Membro: ${item.firstName}`,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Editar', onPress: () => { this.props.navigation.navigate('EditMember',{member: item})}},
        {text: 'Deletar', onPress: () => this.deleteMemberConfirmationDialog(item)},
      ],
      { cancelable: false }
    )
  };

  deleteMemberConfirmationDialog = (item) => {
    Alert.alert(
      'Deseja excluir este membro?',
      `Membro: ${item.firstName}`,
      [
        {text: 'NÃ£o', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim', onPress: () => this.deleteMember(item.memberId)},
      ],
      { cancelable: false }
    )
  };

  setSearchText = (searchText) => {
    this.setState({
      data: this.state.dataSource.filter(item => {
        const itemData = `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()} ${item.email.toLowerCase()} ${item.description.toLowerCase()}`;
        return itemData.indexOf(searchText.toLowerCase()) > -1;
      })
    });
   }

  render() {
    
    if (this.state.isLoading) {
      return	<Loading color={COLOR_MEMBER} />;
    }

    return (
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Input 
          inputColor={COLOR_MEMBER} 
          value={this.state.filter} 
          placeholder={'Filtro...'} 
          onChangeText={(text) => this.setSearchText(text)}
          autoCapitalize={'none'}
        />

        {(this.state.dataSource.length == 0) && <Text>Não há membros cadastrados.</Text>}
        
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Member member={item} action={() => this.optionsMemberDialog(item)} /> }
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

        <Button
          buttonColor={COLOR_MEMBER}
          action={() => this.props.navigation.navigate('NewMember')}
          iconName={'md-person-add'}
          buttonName={'Cadastrar Membro'}
        />

      </KeyboardAvoidingView>
    );
  }
}