import React,{useEffect} from 'react'
import {checkUser} from '../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View,StatusBar } from 'react-native'

const Landing = ({navigation}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser(navigation))
    }, [])

    const options = {
        title: "",
        headerStyle:{
            backgroundColor:'#1f1b24'
        },
        headerTintColor:'#fff'
    }

    useEffect(() => {
        navigation.setOptions(options)
    }, [navigation])

    return (
        
        <View style={styles.container}>
            <StatusBar backgroundColor ='#1f1b24' barStyle='light-content'></StatusBar>
            <Text style={styles.text}>Messaging App</Text>
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#1f1b24',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    text:{
      color:'#ffffff'
    },
})
