import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/session';

export default class Session extends Component{

  constructor(props) {
    super(props);

    const session = this.props.session;
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    this.state = {
      title: session.title,
      description: session.description,
      startDate: new Date(session.interval.startDate).toLocaleDateString('pt-BR', options),
      endDate: new Date(session.interval.endDate).toLocaleDateString('pt-BR', options),
      qtdMembers: session.members.length
    };
  }

  render(){
    return(
      <TouchableOpacity onPress={this.props.action}  >
        <View style={styles.box}>
          <View style={styles.boxImg}>
            <Image style={styles.dimImg} source={require('../images/vote.jpg')} />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.baseText} adjustsFontSizeToFit>
              <Text style={styles.title}>{this.state.title}{'\n'}</Text>
              <Text style={styles.description}>{this.state.description}{'\n'}</Text>
              <Text style={styles.date}>Início: {this.state.startDate}{'\n'}</Text>
              <Text style={styles.date}>Fim: {this.state.endDate}{'\n'}</Text>
              <Text style={styles.description}>Membros: {this.state.qtdMembers}{'\n'}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}