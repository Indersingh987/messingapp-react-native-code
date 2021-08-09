import React,{useEffect} from 'react'
import { getFriendList } from '../redux/actions/friendList'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View,StatusBar,Button, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import Loading from './components/Loading'

const Friends = ({navigation}) => {
  const dispatch = useDispatch()
    let {list,loading} = useSelector(state=> state.friendList)

    useEffect(() => {
        dispatch(getFriendList())
    }, [])

    const handleChat = (id,email,name) => {
        navigation.navigate('Room',{
          id:id,
          email:email,
          name:name
        })
    }
  
  return (
     <View style={styles.container}>
        <StatusBar backgroundColor ='#1f1b24' barStyle='light-content'></StatusBar>
        <ScrollView>
          {loading?(<Loading />):!list.length?(<Text style={styles.text}>Make Some Friends</Text>):list.map(user=>
            ( <View key={user._id} style={styles.component}>
                <View >
                    <Text style={styles.text}>{user.name}</Text>
                    <Text style={styles.textGray}>{user.email}</Text>
                </View>
                <TouchableOpacity onPress={()=>handleChat(user._id,user.email,user.name)}><Icon name="message-square" size={25} color="#ffffff"/></TouchableOpacity>
             </View>))}
        </ScrollView>
      </View>
  );
}

export default Friends

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000',
    flex:1,
    alignItems:'center'
  },
  text:{
    color:'#ffffff'
  },
  textGray:{
    color:'gray'
  },
  btn1:{
    backgroundColor:'blue',
    width:40,
    color:'#ffffff',
    textAlign:'center',
    padding:4
  },
  btn2:{
    backgroundColor:'red',
    width:40,
    color:'#ffffff',
    textAlign:'center',
    padding:4,
    marginLeft:3
  },
  component:{
    width:300,
    backgroundColor:'#1f1b24',
    marginBottom:10,
    padding:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  btnContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});
