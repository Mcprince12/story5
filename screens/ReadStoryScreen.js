import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler'
import db from '../config'

export default class ReadStoryScreen extends React.Component{
   constructor(){
       super();
       this.state={
           search:'',
           requestedBooksList: [],
       };
       this.requestRef = null;
   }

    updateSearch = ( search ) =>
    {
        this.setState( { search: search } );
    }
   
    retrieveStory = () =>
    {
        this.requestRef = db.collection( "Story" )
            .onSnapshot( ( snapshot ) =>
            {
                var requestedBooksList = snapshot.docs.map( document => document.data() )
                this.setState( {
                    requestedBooksList: requestedBooksList,
                } )
            } )
    }
    keyExtractor = ( item, index ) => index.toString();
    renderItem = ( { item, index } ) =>
    {
        return (
           <ListItem
                key={index}
                title={item.title}
                subtitle={item.author}
                titleStyle={{ color: 'black' }}
                bottomDivider
            /> 
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    style = {styles.searchBar}
                    />
                </View>
                <FlatList
                    keyExtractor={
                        this.keyExtractor
                    }
                    data={
                        this.state.requestedBooksList
                    }
                    renderItem={
                        this.renderItem
                    }
                />
                </View>
                     )
            }
            }
const styles = StyleSheet.create({    
    container: {      flex: 1,     
         marginTop: 20    }, 

     searchBar:{      flexDirection:'row',      height:40,      width:'auto',      borderWidth:0.5,      alignItems:'center',      backgroundColor:'grey',      },   
    bar:{      borderWidth:2,      height:30,      width:300,      paddingLeft:10,    },    
    searchButton:{      borderWidth:1,      height:30,      width:50,      alignItems:'center',      justifyContent:'center',      backgroundColor:'green'    } 
 })