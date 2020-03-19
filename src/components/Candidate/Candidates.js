import React, { Component } from 'react';
import Request from '../../API/Request';
import Candidate from '../../custom-components/Candidate';
import { COLOR_MEMBER, CONTAINER, STYLE_TEXT } from '../../styles/common';
import { Loading } from '../../custom-components/Custom';
import { Alert, Text, FlatList, KeyboardAvoidingView, View } from 'react-native';

export default class Candidates extends Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    const token = params ? params.token : null;

    this.state = {
      token: token,
      isLoading: true, 
      session: null,
      candidates: []
    };
  }

  componentDidMount() {
    this.getSessionByToken();
  }

  getSessionByToken = () => {
    Request.Get('Session/Sign-in', this.state.token, null)
    .then(response => {
      this.setState({ isLoading: false, session: response, candidates: response.candidates });
    })
    .catch(error => {
      this.setState({ isLoading: false });
      Alert.alert(error);
      this.props.navigation.goBack();
    });
  };

  sendVote = (item) => {
    this.setState({ isLoading: true });
    let vote = {
      candidateId: item.candidateId,
      sessionId: this.state.session.sessionId,
      userId: item.userId
    };

    Request.Post('Session/Candidate', 'Vote', vote)
    .then(response => {
      this.setState({ isLoading: false });
      Alert.alert('Voto registrado com sucesso!');
      Request.SetItemInStorage(this.state.session.token, this.state.session.token);
      this.props.navigation.navigate('Start');
    })
    .catch(error => {
      this.setState({ isLoading: false });
      console.warn(error);
    })
  };

  optionsVoteDialog = (item) => {
    Alert.alert(
      'Confirmar voto?',
      `Membro: ${item.firstName}`,
      [
        {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim', onPress: () => this.sendVote(item)},
      ],
      { cancelable: false }
    )
  };

  render(){

    let session = this.state.session;

    if (this.state.isLoading) {
      return	<Loading color={COLOR_MEMBER} />;
    }

    return(
      <KeyboardAvoidingView style={CONTAINER} behavior="padding">

        {(session !== null) && 
          <View>
            <Text style={STYLE_TEXT}>{session.title}</Text>
            <Text>{session.description} {'\n'} {session.candidates.length} Candidatos</Text>
          </View>
        }

        {(session.candidates.length == 0) && <Text>Não há candidatos cadastrados nesta sessão.</Text>}
        
        <FlatList
          data={this.state.candidates}
          renderItem={({ item }) => <Candidate member={item} action={() => this.optionsVoteDialog(item)} /> }
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

      </KeyboardAvoidingView>
    );
  }
}