import React,{useEffect} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Requests from './Requests'
import Friends from './Friends'
import Search from './Search'
import { Button, TouchableOpacity } from 'react-native'
import { logout } from '../redux/actions/auth'
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout(navigation))
  }

    const options = {
      title: "Messaging App",
      headerStyle:{
        backgroundColor:'#1f1b24',
        elevation:0
      },
      headerTintColor:'#fff',
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out-outline" size={30} color="tomato"/>
        </TouchableOpacity>)
    }

    useEffect(() => {
      navigation.setOptions(options)
    }, [navigation])

    return (
      <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: '#ffffff',
        style:{
          backgroundColor:'#1f1b24'
        }
        }}>
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Requests" component={Requests} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
        
    )
}

export default Home


  
