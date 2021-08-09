import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import {login,register} from '../redux/actions/auth'


const Auth = ({navigation}) => {
    const [Login, setLogin] = useState(true)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch() 
    const {errors} = useSelector(state=>state.auth)

    const options = {
        title: Login ? 'Login':"Register",
        headerStyle:{
            backgroundColor:'#1f1b24'
        },
        headerTintColor:'#fff'
    }

    useEffect(() => {
        navigation.setOptions(options)
    }, [navigation,Login])

    const handleLogin = () => {
        setLogin(prev=>!prev)
    }

    const handleData = () => {
        if(login){
            dispatch(login({email,password},navigation))
        }else{
            dispatch(register({name,email,password,password2:confirmPassword},navigation))
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor ='#1f1b24' barStyle='light-content'></StatusBar>

            {!Login && <TextInput style={styles.input} value={name} onChangeText={v=>setName(v)} placeholder='Name' textContentType='name'/>}
            {!Login && errors && (<Text style={styles.red}>{errors.name}</Text>)}

            <TextInput style={styles.input} value={email} onChangeText={(val)=>setEmail(val)} placeholder="Email" textContentType='emailAddress' />
            {errors && (<Text style={styles.red}>{errors.email}</Text>)}

            <TextInput style={styles.input} value={password} onChangeText={v=>setPassword(v)} placeholder='Password' textContentType='password' />
            {errors && (<Text style={styles.red}>{errors.password}</Text>)}

            {!Login && <TextInput style={styles.input} value={confirmPassword} onChangeText={v=>setConfirmPassword(v)} placeholder='Confirm Password' textContentType='password' />}
            
            <TouchableOpacity onPress={handleData}><Text style={styles.btnMain}>{Login?'Login':'Register'}</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}><Text style={styles.btnChange}>{!Login?'Login':'Register'}</Text></TouchableOpacity>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#000',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    text:{
      color:'#ffffff'
    },
    red:{
        color:'red'
    },
    input:{
        width:300,
        height:40,
        backgroundColor:'#1f1b24',
        marginTop:10
    },
    btnMain:{
        color:'#ffffff',
        backgroundColor:'#24a0ed',
        padding:8,
        width:300,
        textAlign:'center',
        marginTop:10
    },
    btnChange:{
        backgroundColor:'gray',
        color:'#000',
        marginTop:10,
        padding:8,
        width:300,
        textAlign:'center'
    }
  });