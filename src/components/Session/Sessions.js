import React, { Component } from "react";
import Request from '../../API/Request';
import { COLOR_SESSION, CONTAINER } from '../../styles/common';
import Session from '../../custom-components/Session';
import { Button, Input, Loading } from '../../custom-components/Custom';
import { Text, Alert, FlatList, KeyboardAvoidingView } from "react-native";

export default class Sessions extends Component {

	constructor(props){
		super(props);

		const { params } = props.navigation.state;
		const userId = params ? params.userId : null;

		this.state = {
      userId: userId,
      filter: '',
			isLoading: true,
			refreshing: false
		};
	}

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

      this.getSessions();
    })
    .catch(error => {
      console.warn(error);
    });
	}

	getSessions = () => {
    Request.Get('Sessions', null, `userId=${this.state.userId}`)
    .then((response) => {
      this.setState({
        isLoading: false,
        dataSource: response,
        data: response,
        refreshing: false
      });
    })
    .catch((error) => {
      this.setState({
        isLoading: false,
        refreshing: false
      });
      Alert.alert(error);
    });
	};

	deleteSession = (id) => {
    this.setState({ isLoading: true });
    Request.Delete('Session', id)
    .then(response => {
      let updatedList = this.state.dataSource.filter((x, i) => x.sessionId != id);
      
      Alert.alert("Sessão excluida!");

      this.setState({ 
        isLoading: false, 
        dataSource: updatedList,
        data: updatedList
      });
    })
  };

	deleteSessionConfirmationDialog = (item) => {
    Alert.alert(
      'Deseja excluir esta sessão?',
      `Sessão: ${item.title}`,
      [
        {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim', onPress: () => this.deleteSession(item.sessionId)},
      ],
      { cancelable: false }
    )
  };
	
	optionsSessionDialog = (item) => {
    Alert.alert(
      'O que deseja fazer com esta sessão?',
      `Sessão: ${item.title}`,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Editar', onPress: () => { this.props.navigation.navigate('EditSession',{session: item})}},
        {text: 'Deletar', onPress: () => this.deleteSessionConfirmationDialog(item)},
      ],
      { cancelable: false }
    )
  };

	handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => { this.getSessions(); });
  };

  setSearchText = (searchText) => {
    this.setState({
      data: this.state.dataSource.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
        return itemData.indexOf(searchText.toUpperCase()) > -1;
      })
    });
  }

	render(){

		if (this.state.isLoading) {
      return	<Loading color={COLOR_SESSION} />;
    }

		return (
			<KeyboardAvoidingView style={CONTAINER} behavior="padding">

        <Input 
          inputColor={COLOR_SESSION} 
          value={this.state.filter} 
          placeholder={'Filtro...'} 
          onChangeText={(text) => this.setSearchText(text)}
          autoCapitalize={'none'}
        />

				{(this.state.dataSource.length == 0) && <Text>Não há sessões cadastradas.</Text>}

				<FlatList
          data={this.state.data}
          renderItem={({ item }) => <Session session={item} action={() => this.optionsSessionDialog(item)} /> }
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

        <Button
          buttonColor={COLOR_SESSION}
          action={() => this.props.navigation.navigate('NewSession')}
          iconName={'ios-add-circle-outline'}
          buttonName={'Cadastrar Sessão'}
        />

			</KeyboardAvoidingView>
		);
	}
}