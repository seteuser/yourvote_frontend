import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/user';

export default class User extends Component{

  constructor(props) {
    super(props);

    const user = this.props.user;

    this.state = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

  render(){
    return(
      <TouchableOpacity onPress={this.props.action} >
        <View style={styles.box}>
          <View style={styles.boxImg}>
            <Image style={styles.dimImg} source={require('../images/user.png')} />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.baseText} adjustsFontSizeToFit>
              <Text style={styles.firstName}>{this.state.firstName}{' '}</Text>
              <Text style={styles.lastName}>{this.state.lastName}{'\n'}</Text>
              <Text style={styles.email}>{this.state.email}{'\n'}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}