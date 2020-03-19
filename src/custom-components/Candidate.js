import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/candidate';

export default class Candidate extends Component{

  constructor(props) {
    super(props);

    const member = this.props.member;

    this.state = {
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      description: member.description
    };
  }

  render(){
    return(
      <TouchableOpacity onPress={this.props.action} >
        <View style={styles.box}>
          <View style={styles.boxImg}>
            <Image style={styles.dimImg} source={require('../images/tim.jpg')} />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.baseText}>
              <Text style={styles.firstName}>{this.state.firstName}{' '}</Text>
              <Text style={styles.lastName}>{this.state.lastName}{'\n'}</Text>
              <Text style={styles.email}>{this.state.email}{'\n'}</Text>
              <Text style={styles.description}>{this.state.description}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

