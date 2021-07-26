import React from 'react'
import { StyleSheet, Text, View,StatusBar, Button } from 'react-native'
import { logout } from '../redux/actions/auth'
import { useDispatch } from 'react-redux'

const Home = ({navigation}) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
      dispatch(logout(navigation))
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor ='#000' barStyle='light-content'></StatusBar>
            <Text style={styles.text}>Home Screen</Text>
            <Button title='logOut' onPress={handleLogout}/>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    app:{
      backgroundColor:'#000'
    },
    container:{
      backgroundColor:'#000',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    text:{
      color:'#ffffff'
    }
  });
  
