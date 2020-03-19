import React, { Component } from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet, View, ActivityIndicator, Modal, FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker'; 
import { COLOR_LINK, CONTAINER } from '../styles/common';
import { Ionicons } from '@expo/vector-icons';

export class LiveTile extends Component{
    render(){
        return(
          <View style={styles.boxTile}>
            <View style={styles.tile} />
            <View style={{height: 50, backgroundColor: 'skyblue'}} />
            <View style={{height: 50, backgroundColor: 'steelblue'}} />
          </View>
        );
    }
}

export class Button extends Component{

	constructor(props){
    super(props);

    this.defaultButton = {
      width: '100%',
      backgroundColor: '#FF0D25',
      padding: 8,
      margin: 12,
      borderRadius:10
    };

    if (props.buttonColor){
      this.defaultButton.backgroundColor = props.buttonColor;
    }
	}

	render(){
		return(
			<TouchableOpacity onPress={this.props.action} style={this.defaultButton}>
				<Text style={styles.buttonText}> 
						<Ionicons name={this.props.iconName} style={styles.Icon} size={30} /> {this.props.buttonName}
				</Text>
			</TouchableOpacity>
		);
	}
}

export class Input extends Component{

  constructor(props){
    super(props);

    this.defaultInput = {
      width: '100%',
      height: 40,
      borderColor: '#FF0D25',
      borderWidth: 1,
      marginTop: 10,
      paddingLeft: 10,
      marginBottom: 10,
      borderRadius:10
    };

    if (props.inputColor){
      this.defaultInput.borderColor = props.inputColor;
    }
	}

  render(){
    return(
      <TextInput
        underlineColorAndroid="transparent"
        style={this.defaultInput}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.inputColor}
        maxLength={60}
        {...this.props}
      ></TextInput>
    );
  }
}

export class Link extends Component{
  render(){
    return(
      <TouchableOpacity onPress={this.props.action}>
        <Text style={styles.forgivePassword}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}

export class Loading extends Component{
  render(){
    return(
      <View style={CONTAINER}>
        <ActivityIndicator size="large" color={this.props.color} />
      </View>
    );
  }
}

export class InputDate extends Component{

  constructor(props){
    super(props);

    this.defaultInput = {
      width: '100%',
      height: 40,
      borderColor: '#FF0D25',
      borderWidth: 1,
      marginTop: 10,
      paddingLeft: 10,
      marginBottom: 10,
      borderRadius:10
    };

    if (props.inputColor){
      this.defaultInput.borderColor = props.inputColor;
    }
	}

  render(){
    return(
      <DatePicker
          style={this.defaultInput}
          date={this.props.date}
          mode="date"
          placeholder={this.props.placeholder}
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="31-12-2020"
          confirmBtnText="OK"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: styles.dateIcon,
            dateInput: {
              marginLeft: 36,
              borderRadius: 10,
              borderColor: this.defaultInput.borderColor
            }
          }}
          onDateChange={this.props.onChange}
        />
    );
  }
}

export class PopUpModal extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      modalVisible: false, 
      entityColor: this.props.color,
      items: this.props.items
    };    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed.')}>
          <View style={{marginTop: 22}}>
            <View>
              <FlatList
                data={this.state.items}
                renderItem={({ item }) => {this.props.component} }
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />

              <Button
                buttonColor={this.state.entityColor}
                action={() => this.setModalVisible(true)}
                iconName={'ios-add-circle-outline'}
                buttonName={'Abrir Modal'}
              />
            </View>
          </View>
        </Modal>
        <Button
          buttonColor={this.state.entityColor}
          action={() => this.setModalVisible(!this.state.modalVisible)}
          iconName={'ios-add-circle-outline'}
          buttonName={'[X] Close'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxTile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  tile:{
    width: '50%', 
    height: '50%', 
    backgroundColor: 'skyblue'
  },
  buttonText: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#F6F6F6'
  },
  Icon: {
    alignItems: 'center',
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  forgivePassword: {
    marginTop: 10,
    color: COLOR_LINK,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});