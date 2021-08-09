import React,{useState,useEffect} from 'react'
import { getAllUsers,cancle,request,search } from '../redux/actions/users'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View,StatusBar, TouchableOpacity,TextInput, ScrollView, TouchableHighlight,Button } from 'react-native'
import Loading from './components/Loading'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch() 
  const data = useSelector(state=>state.users)

  useEffect(() => {
      dispatch(getAllUsers())
  }, [dispatch])

  const handleSubmit = () => {
      dispatch(search(searchQuery))
  }

  const handleRequest = (isSend,id,index) => {
      if(isSend){
          dispatch(cancle(id,index))
      }else{
          dispatch(request(id,index))
      }
  }
  
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor ='#000' barStyle='light-content'></StatusBar>
    <View style={styles.search}>
        <TextInput  style={styles.input} type='text' value={searchQuery} onChangeText={e=>setSearchQuery(e)} placeholder='Search...' />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}><Text style={styles.text}>Search</Text></TouchableOpacity> 
    </View>

    <ScrollView>
    {data.loading?(<Loading />):!data.users.length ? (<Text style={styles.text}>No Result Found</Text>):data.users?.map((obj,index)=>((<View key = {obj.user._id} style={styles.component}>
      <View >
          <Text style={styles.text}>{obj.user.name}</Text>
          <Text style={styles.textGray}>{obj.user.email}</Text>
      </View>
      {!obj.btn?<Loading/>:<TouchableHighlight onPress={()=>handleRequest(obj.isSend,obj.user._id,index)}><Text style={styles.btn2}>{obj.isSend?'cancle':'request'}</Text></TouchableHighlight>}
    </View>)))}
    </ScrollView>
</View>
  );
}

export default Search

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
    search:{
      margin:10,
      flexDirection:'row'
    },
    input:{
      backgroundColor:'#1f1b24',
      color:'#ffffff',
      height:40,
      flex:1
    },
    btn:{
      backgroundColor:'#24a0ed',
      alignItems:'center',
      justifyContent:'center',
      padding:5
    },
    btn2:{
      backgroundColor:'#000',
      width:60,
      color:'#ffffff',
      textAlign:'center',
      padding:4
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
    }
  });
