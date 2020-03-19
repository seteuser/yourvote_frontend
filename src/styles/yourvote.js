import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_LINK } from './common';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //margin: 3,
    //padding: 10
  },
  containerList:{
    //flex: 1,
    //margin: 3,
    //padding: 10
  },
  horizontalRow: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5
  },  
  input: {
    width: '100%',
    height: 40,
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius:10
  },
  text: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
    fontSize: 30,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  forgivePassword: {
    marginTop: 10,
    color: COLOR_LINK,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    backgroundColor: COLOR_PRIMARY,
    padding: 10,
    marginTop: 20,
    borderRadius:10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#F6F6F6'
  }
});

module.exports = styles;