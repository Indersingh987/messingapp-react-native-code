import React,{ useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getRequestList, acceptRequest,rejectRequest } from '../redux/actions/requestList'
import Loading from './components/Loading'
import { StyleSheet, Text, View,StatusBar, TouchableOpacity,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Requests = () => {
    const dispatch = useDispatch()
    let { list,loading } = useSelector(state=>state.requestList)

    useEffect(() => {
        dispatch(getRequestList())
    }, [dispatch])

    const accept = (index,id) => {
        dispatch(acceptRequest(id,index))
    }

    const reject = (index,id) => {
        dispatch(rejectRequest(id,index))
    }

    return (
        <View style={styles.container}>
          <StatusBar backgroundColor ='#000' barStyle='light-content'></StatusBar>
          <ScrollView>
            {loading?(<Loading />):!list.length ? (<Text style={styles.text}>No Request</Text>):list.map((obj,index)=>
            (<View key={obj.user._id} style={styles.component}>
                <View >
                    <Text style={styles.text}>{obj.user.name}</Text>
                    <Text style={styles.text}>{obj.user.email}</Text>
                </View>
                {!obj.btn?(<Loading />):<View style={styles.btnContainer}>
                    <TouchableOpacity onPress={()=>accept(index,obj.user._id)}><Icon name="ios-checkmark" size={20} color="blue"/></TouchableOpacity>
                    <TouchableOpacity onPress={()=>reject(index,obj.user._id)}><Icon name="close" size={20} color="tomato"/></TouchableOpacity>
                </View>}
            </View>))}
          </ScrollView> 
        </View>
    );
}

export default Requests

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
