import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_USER, COLOR_MEMBER, COLOR_SESSION, COLOR_TESTS } from './src/styles/common';
import { StackNavigator } from 'react-navigation';
import Start from './src/components/Management/Start';
import Login from './src/components/Management/Login';
import RecoveryPassword from './src/components/User/RecoveryPassword';
import Dashboard from './src/components/Management/Dashboard';
import LostToken from './src/components/Member/LostToken';
import NewUser from './src/components/User/NewUser';
import Users from './src/components/User/Users';
import EditUser from './src/components/User/EditUser';
import NewMember from './src/components/Member/NewMember';
import EditMember from './src/components/Member/EditMember';
import Members from './src/components/Member/Members';
import Candidates from './src/components/Candidate/Candidates';
import Sessions from './src/components/Session/Sessions';
import NewSession from './src/components/Session/NewSession';
import EditSession from './src/components/Session/EditSession';
import Teste from './src/components/Management/Teste';
import SessionManager from './src/components/Session/SessionManager';

const YourVoteApp = StackNavigator({
	Start: { 
		screen: Start,
		navigationOptions: { header: null } 
	},
	Login: { 
		screen: Login,
		navigationOptions: {
			title: "Login",
			headerTintColor: COLOR_PRIMARY,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	RecoveryPassword: { 
		screen: RecoveryPassword,
		navigationOptions: {
			title: "Recuperar Senha",
			headerTintColor: COLOR_PRIMARY,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Dashboard: { 
		screen: Dashboard,
		navigationOptions: {
			title: "Dashboard",
			headerTintColor: COLOR_PRIMARY,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	NewUser: { 
		screen: NewUser,
		navigationOptions: {
			title: "Cadastrar Usuário",
			headerTintColor: COLOR_USER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Users: { 
		screen: Users,
		navigationOptions: {
			title: "Usuários",
			headerTintColor: COLOR_USER,
			headerTitleStyle: { alignSelf: 'center' }		
		}
	},
	EditUser: { 
		screen: EditUser,
		navigationOptions: {
			title: "Editar Usuário",
			headerTintColor: COLOR_USER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	NewMember: { 
		screen: NewMember,
		navigationOptions: {
			title: "Cadastrar Membro",
			headerTintColor: COLOR_MEMBER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	EditMember: { 
		screen: EditMember,
		navigationOptions: {
			title: "Editar Membro",
			headerTintColor: COLOR_MEMBER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Members: { 
		screen: Members,
		navigationOptions: {
			title: "Membros",
			headerTintColor: COLOR_MEMBER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Candidates: { 
		screen: Candidates,
		navigationOptions: {
			title: "Candidatos",
			headerTintColor: COLOR_MEMBER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Sessions: { 
		screen: Sessions,
		navigationOptions: {
			title: "Sessões",
			headerTintColor: COLOR_SESSION,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	NewSession: { 
		screen: NewSession,
		navigationOptions: {
			title: "Cadastrar Sessão",
			headerTintColor: COLOR_SESSION,
			headerTitleStyle: { alignSelf: 'center' } 
		}
	},
	EditSession: { 
		screen: EditSession,
		navigationOptions: {
			title: "Editar Sessão",
			headerTintColor: COLOR_SESSION,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	LostToken: { 
		screen: LostToken,
		navigationOptions: {
			title: "Recuperar Token",
			headerTintColor: COLOR_USER,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	Teste: { 
		screen: Teste,
		navigationOptions: {
			title: "Testes",
			headerTintColor: COLOR_TESTS,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
	SessionManager: { 
		screen: SessionManager,
		navigationOptions: {
			title: "SessionManager",
			headerTintColor: COLOR_TESTS,
			headerTitleStyle: { alignSelf: 'center' }
		}
	},
});

export default class App extends Component {
	render() {
		return (
			<YourVoteApp />
		);
	}
}

AppRegistry.registerComponent("App", () => App);
