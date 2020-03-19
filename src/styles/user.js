import { StyleSheet } from 'react-native';
import { COLOR_USER } from './common';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'flex-start',
  },
  dimImg: {
    width: 90, 
    height: 90,
    borderRadius: 40
  },
  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR_USER,
    //padding: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  boxContent: {
    //padding: 15,
  },
  boxImg: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 40
  },
  baseText: {
    marginTop: 10,
    marginLeft: 15,
    lineHeight: 30,
  },
  firstName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLOR_USER
  },
  lastName: {
    fontSize: 20,
    color: COLOR_USER
  },
  email:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF0D25'
  }
});

module.exports = styles;