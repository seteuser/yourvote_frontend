import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default class SessionManager extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 70, height: 70, backgroundColor: 'powderblue'}} />
          <View style={{width: 70, height: 70, backgroundColor: 'skyblue'}} />
        </View>
        {/* <View style={styles.buttonRows}>
          <TouchableOpacity onPress={Alert.alert('Sucesso haha')} style={styles.button}>
            <Text style={styles.buttonText}> TESTE steelblue</Text> 
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  buttonText: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#F6F6F6'
  },
});