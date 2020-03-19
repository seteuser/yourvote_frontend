import { StyleSheet } from 'react-native';
import { COLOR_MEMBER } from './common';

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
    borderWidth: 3,
    borderColor: COLOR_MEMBER,
    marginBottom: 10,
    borderRadius: 10
  },
  boxContent: {
    padding: 15,
  },
  boxImg: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 40
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
    fontSize: 18,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

module.exports = styles;