  import { AsyncStorage } from 'react-native';

const urlBase = 'http://brilhamuito.apphb.com/';
//const urlBase = 'http://localhost:64797/'; //Local

class Request{

  static async Validate(){
    try{
      return await new Promise((resolve, reject) => {
        Request.GetItemInStorage('user')
        .then(response => { 
          resolve(response);
        })
        .catch(error =>{
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async Get(entity, id = '', parameter = ''){
    let url = urlBase + `${entity}`;

    if(id != null && id != '') url += `/${id}`;
    if(parameter != null && parameter != '') url += `?${parameter}`;

    try{
      return await new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson.response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async Post(entity, action, body){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `${entity}/${action}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async Update(entity, body){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `${entity}/Edit`, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async Delete(entity, id){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `${entity}/${id}`, {
        method: 'Delete',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }).then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async Login(email, password){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `User/Sign-in?email=${email.toLowerCase()}&password=${password}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }).then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async RecoverPassword(email){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `User/Forgot?email=${email.toLowerCase()}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  //TODO: implementar
  static async RecoverToken(email){
    try{
      return await new Promise((resolve, reject) => {
        fetch(urlBase + `User/Forgot?email=${email}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    catch(ex){
      console.warn(ex);
    }
  }

  static async SetItemInStorage(key, value) {
		try {
			return await AsyncStorage.setItem(key, JSON.stringify(value));
		}
		catch (error) {
			console.warn(`Erro: ${error}`);
		}
  }
  
  static async GetItemInStorage(key){
    try{
      let item = await AsyncStorage.getItem(key);
      return JSON.parse(item);
    }
    catch(error){
      console.warn(error);
    }
  }

  static async RemoveItemInStorage(key){
    try{
      return await AsyncStorage.removeItem(key);
    }
    catch(error){
      console.warn(error);
    }
  }
}

module.exports = Request;
