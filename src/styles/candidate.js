import { StyleSheet } from 'react-native';
import { COLOR_MEMBER } from './common';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#F6F6F6',
    //justifyContent: 'flex-start',
    margin: 10,
    //padding: 20
  },
  dimImg: {
    width: 80, 
    height: 80,
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: COLOR_MEMBER,
    justifyContent: 'flex-start',
    //padding: 10,
    marginBottom: 10
  },
  boxImg: {
    borderWidth: 2,
    borderColor: 'gray'
  },
  baseText: {
    marginLeft: 15,
    lineHeight: 30,
  },
  firstName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLOR_MEMBER
  },
  lastName: {
    fontSize: 20,
    color: COLOR_MEMBER
  },
  email:{
    fontSize: 15,
  },
  description: {
    fontSize: 15,
    fontWeight: 'bold',
  }
});

module.exports = styles;