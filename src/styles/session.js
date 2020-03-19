import { StyleSheet } from 'react-native';
import { COLOR_SESSION } from './common';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'flex-start',
  },
  dimImg: {
    width: 80, 
    height: 80,
    marginTop: 10,
    borderRadius: 40
  },
  box: {
    width: '100%',
    marginLeft: 0, 
    marginRight: 0,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: COLOR_SESSION,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  boxImg: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40
  },
  baseText: {
    marginLeft: 15,
    lineHeight: 30,
  },
  title: {
    fontWeight: 'bold',
    color: COLOR_SESSION
  },
  description: {
    color: COLOR_SESSION
  },
  date:{
    fontSize: 18,
  },
});

module.exports = styles;