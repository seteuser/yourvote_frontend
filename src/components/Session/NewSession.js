import React, { Component } from 'react';
import Request from '../../API/Request';
import { COLOR_SESSION, CONTAINER } from '../../styles/common';
import { Input, Button, Loading, InputDate, PopUpModal } from '../../custom-components/Custom';
//import styles from '../../styles/yourvote'
import { Alert, KeyboardAvoidingView, Modal, View, TouchableHighlight, Text, FlatList, StyleSheet, CheckBox } from 'react-native';
import Candidate from '../../custom-components/Candidate';

export default class NewSession extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userId: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      members: [],
      candidates: [],
      checked: false,
      modalVisible: false
    };
    
    this.initialState = this.state;
  }

  componentDidMount() {    
    Request.GetItemInStorage('user')
    .then(response => {
      const user = response;
      this.setState({ userId: user.userId });

      Request.Get('Members', null, `userId=${user.userId}`)
      .then(response => {
        this.setState({ isLoading: false, members: response });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        Alert.alert(error);
      });
    })
    .catch(error => {
      Alert.alert(error);
    });
  }

  resetForm = () => this.setState(this.initialState);

  setField = (text, field) => this.setState({ [field]: text });

  setModalVisible = (visible) => this.setState({ modalVisible: visible });  

  AddRemoveCandidate(item){
    let newList = this.state.candidates;

    if(newList.includes(item.memberId))
      newList = newList.filter(x => x != item.memberId);
    else
      newList.push(item.memberId); 
    
    this.setState({ 
      candidates: newList,
      modalVisible: false
    }, () => {
      //this.setState({ modalVisible: true });
      this.setState({ checked: !this.state.checked });
    });
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.modalContent}>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={this.state.checked}
            onValueChange={() => this.setState({ checked: !this.state.checked })}
          />
          <Text style={{marginTop: 5}}> {item.firstName}</Text>
        </View>
      </View>
      // <TouchableHighlight onPress={() => this.AddRemoveCandidate(item)} style={styles.modalContent}>        
      //     <Text>{item.firstName} {'\t'} {this.state.candidates.includes(item.memberId) ? '[ - ]' : '[ + ]'}</Text>        
      // </TouchableHighlight>
    );
  };

  NewSession() {
    this.setState({ isLoading: true });

    const Session = {
      userId: this.state.userId,
      image: this.state.image,
      title: this.state.title,
      description: this.state.description,
      interval: {
        startDate: this.state.startDate.split("-").reverse().join("-"),
        endDate: this.state.endDate.split("-").reverse().join("-")
      },
      members: this.state.candidates
    };

    Request.Post('Session', 'Save', Session)
    .then((response) => {
      this.resetForm();
      Alert.alert(`Sessão Cadastrado!`);
      this.props.navigation.goBack();
    })
    .catch((error) => {
      this.setState({ isLoading: false });
      Alert.alert(`Erro: ${error}`);
    });
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

        <View style={{marginTop: 10, marginBottom: 10}}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalContent}>
              <View>
                <FlatList
                  style={styles.Flat}
                  data={this.state.members}
                  extraData={this.state.candidates}
                  renderItem={ this.renderItem }
                  keyExtractor={item => item.memberId}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />

                <TouchableHighlight onPress={() => this.setModalVisible(false)} style={styles.button}>
                  <Text>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.setModalVisible(true)}>
            <Text>Adicionar Membros</Text>
          </TouchableHighlight>
        </View>

        <Button
          buttonColor={COLOR_SESSION}
          action={this.NewSession.bind(this)}
          iconName={'ios-add-circle-outline'}
          buttonName={'Salvar'}
        />

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})