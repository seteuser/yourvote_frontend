import React, { Component } from "react";
import Request from '../../API/Request';
import { COLOR_PRIMARY, CONTAINER } from "../../styles/common";
import { Input, Button, Link, Loading } from '../../custom-components/Custom';
import { Alert, KeyboardAvoidingView } from "react-native";

export default class Login extends Component {

	constructor(props) {
		super(props);

		this.state = { email: "",	password: "" };
		this.initialState = this.state;
	}

	componentDidMount = () => this.setState({ email: "lucas.bartowski@yourvote.com", password: "123456" });
	
	Login() {
		if (this.state.email == "" || this.state.password == "") {
			Alert.alert(`Preencha o campo ${this.state.email == "" ? 'Email' : 'Senha'} para prosseguir!`);
			return;
		}

		this.setState({ isLoading: true });

		Request.Login(this.state.email, this.state.password)		
		.then((responseJson) => {
			this.setState({ isLoading: false });

			if (responseJson.response !== null) {
				const user = responseJson.response;
				Request.SetItemInStorage("user", user);
				this.props.navigation.navigate("Dashboard", { user: user });
			}
			else {
				Alert.alert("Usuário ou senha incorretos!");
			}
		})
		.catch(error => {
			this.setState({ isLoading: false });
			error.text().then( errorMessage => {
				this.props.dispatch(displayTheError(errorMessage));
			});
		});
	}

	setField = (text, field) => this.setState({ [field]: text });

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.isLoading) {
			return	<Loading color={COLOR_PRIMARY} />;
		}

		return (
			<KeyboardAvoidingView style={CONTAINER} behavior="padding">

				<Input 
          inputColor={COLOR_PRIMARY} 
          value={this.state.email} 
          placeholder={'E-mail'} 
          onChangeText={(text) => this.setField(text, 'email')} 
					keyboardType={'email-address'}
					autoCapitalize={'none'}
        />

				<Input 
          inputColor={COLOR_PRIMARY} 
          value={this.state.password} 
          placeholder={'Senha'} 
          onChangeText={(text) => this.setField(text, 'password')} 
          secureTextEntry 
        />

				<Button 
          buttonColor={COLOR_PRIMARY} 
          action={this.Login.bind(this)} 
          iconName={'ios-log-in'} 
          buttonName={'ENTRAR'} 
        />

				<Link action={() => navigate("RecoveryPassword")} text={'Esqueceu sua senha?'} />

			</KeyboardAvoidingView>
		);
	}
}