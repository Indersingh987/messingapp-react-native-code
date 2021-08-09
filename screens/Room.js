import React,{useEffect,useRef,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {getList,create} from '../redux/actions/room'
import { ScrollView } from 'react-native-gesture-handler'
import Loading from './components/Loading'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import io from 'socket.io-client'
import isEmpty from 'is-empty'

const Room = ({route,navigation}) => {
    const {id,email,name} = route.params
    const dispatch = useDispatch()
    let {list,friend,loading} = useSelector(state=>state.room)
    const [List,setList] = useState(list)
    const [text,setText] = useState('')
    const scrollViewRef = useRef()
    let Email;
    const endpoint = "https://messaging-app-api-987.herokuapp.com/"

    const options = {
      headerTitle:()=><View><Text style={styles.title}>{name}</Text><Text style={styles.textGray}>{email}</Text></View>,
      headerStyle:{
          backgroundColor:'#1f1b24'
      },
      headerTintColor:'#fff'
    };
    useEffect(() => {
        navigation.setOptions(options)
    }, [navigation])

    useEffect(() => {
        dispatch(getList(id))
    }, [])

    useEffect(() => {
      setList(list)
    }, [list])

    useEffect(() => {
      const socket = io(endpoint, { transports: ['websocket', 'polling', 'flashsocket']});
      console.log(socket.connected)
      const getEmail = async () => {
        let user  = await AsyncStorage.getItem('user')
        const u = await JSON.parse(user)
        Email = u.email

        socket.on(Email, data => {
          if(JSON.stringify(data.senderId) === JSON.stringify(id)){
            console.log(data)
              setList(prev=>[...prev,data])
          }
        });
       }
       getEmail()
      
        return () => {
            socket.disconnect()
            console.log(socket.disconnected)
        }
    }, [Email])

    const handleSubmit = () => {
      const time = moment().format('h:mm a')
      if(!isEmpty(text)){
          dispatch(create(id,text,time))
          const obj = {
              id:time+Math.random(),
              msg:text,
              timestamp:time,
              isSender:true
          }
          setList(prev=>[...prev,obj])
      }
      setText('')
  }

    return (
        <View style={styles.container}>
          <StatusBar backgroundColor ='#1f1b24' barStyle='light-content'></StatusBar>
            <ScrollView style={styles.messageListContainer}ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            {loading?<Loading margin={'auto'} />:!List.length?<Text style={styles.text}>Send Hii</Text>:List.map(message=>
                    (<View key={message.id} style={message.isSender?styles.sender:styles.reciever}>
                        <Text style={styles.text}>{message.msg}</Text>
                        <Text style={styles.textGray}>{message.timestamp}</Text>
                    </View>))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput value={text} onChangeText={t=>setText(t)} style={styles.input} placeholder="Type message..."/>
              <TouchableOpacity onPress={()=>handleSubmit()}>
                <Icon name="ios-send-sharp" size={30} color="#24a0ed"/>
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default Room

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1,
        alignItems:'center'
      },
      title:{
        color:'#ffffff'
      },
      text:{
        color:'#ffffff',
        fontSize:13
      },
      textGray:{
        color:'lightgray',
        fontSize:10
      },
      messageListContainer:{
          width:'100%',
          paddingLeft:10,
          paddingRight:10,
          flex:1
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
      sender:{
        backgroundColor:"#24a0ed",
        alignSelf:'flex-end',
        padding:5,
        marginBottom:3
      },
      reciever:{
        backgroundColor:'#2f2a36',
        alignSelf:'flex-start',
        padding:5,
        marginBottom:3
      },
      input:{
        width:300,
        height:40,
        backgroundColor:'#1f1b24',
        color:"#ffffff",
        marginTop:10,
        marginRight:5
      },
      footer:{
        flexDirection:'row',
        alignItems:'center'
      }
})
