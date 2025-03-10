import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import {useRouter} from 'expo-router';
import {useAuth} from '@/context/AuthContext';

const AuthScreen = () => {

	const handelAuth =async () =>{
		if(!email.trim() || !password.trim()){
			setError('Email and password are required')
			return
		}

		if(isRegistering && password !== confirmPassword){
			setError('Password do not match')
			return
		}

		let response
		if(isRegistering){
			response = await register(email,password)
		}else{
			response = await login(email,password)
		}
		if(response?.error){
			setError(response.error)
			Alert.alert('Error', response.error)
			return
		}

		router.replace('/notes')
	}
	const {login,register} = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isRegistering, setIsRegistering] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	return (
		 <View style={style.page}>
			 <Text style={style.header}>{isRegistering ? 'Sing up' : 'Login'}</Text>
			 {error ? <Text style={style.error}>{error}</Text> : null}
			 <TextInput
				  style={style.input}
				  placeholder={'Email'}
				  placeholderTextColor='#aaa'
				  value={email}
				  onChangeText={setEmail}
				  autoCapitalize='none'
				  keyboardType='email-address'
			 />
			 <TextInput
				  style={style.input}
				  placeholder={'Password'}
				  placeholderTextColor='#aaa'
				  value={password}
				  onChangeText={setPassword}
				  secureTextEntry
				  textContentType="none"
			 />
			 {isRegistering && (
			 <TextInput
				  style={style.input}
				  placeholder={'Confirm Password'}
				  placeholderTextColor='#aaa'
				  value={confirmPassword}
				  onChangeText={setConfirmPassword}
				  secureTextEntry
				  textContentType="none"
			 />)}

			 <TouchableOpacity style={style.button} onPress={handelAuth}>
				 <Text style={style.buttonText}>{isRegistering ? 'Sing Up' : 'Login'}</Text>
			 </TouchableOpacity>

			 <TouchableOpacity onPress={() => {setIsRegistering(!isRegistering)}}>
				 <Text style={style.switchText}>
					 {isRegistering ? 'Already have a account? Login' : "Don't have a account? Sing up"}
				 </Text>
			 </TouchableOpacity>
		 </View>
	);
};

const style = StyleSheet.create ({
		page:{
			flex: 1,
			padding: 20,
			backgroundColor:'#fff',
			justifyContent:'center',
			alignItems:'center',
		},
		header:{
			fontSize:28,
			fontWeight:'bold',
			marginBottom:20,
			color:'#333'
		},
		error:{
			color:'red',
			marginBottom:10,
			fontSize:16,
		},
	  input:{
			width:'100%',
		  padding:12,
		  borderWidth:1,
		  borderColor:'#ddd',
		  borderRadius:8,
		  marginBottom:12,
		  backgroundColor:'#fff',
		  fontSize:16
		},
		button:{
			backgroundColor:'#2eb82e',
			paddingVertical:12,
			borderRadius:8,
			width:'100%',
			alignItems:'center',
			marginBottom:10,
		},
		buttonText:{
			color:'#fff',
			fontSize:18,
			fontWeight:'bold',
		},
		switchText:{
			marginTop:10,
			color:'#d78311',
			fontSize:16,
		},
})

export default AuthScreen;
