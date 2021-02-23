import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppHeader from '../AppHeader';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            author:'',
            title:'',
            story:''
        }
    }
    submitStory = (author, title, story)=>{
       db.collection("Story").add({
           'Author': author,
           'Title': title,
           'Story': story,
       } )
        this.setState( {
            author: '',
            title: '',
            story: '',
        } )
        alert( "Your story has been successfully submitted" );
    }

    render(){
        return (
            <View>
            <KeyboardAvoidingView>
                <AppHeader/>
                
                <TextInput style = {styles.inputBox}
                placeholder={"Story Title"}
                onChangeText={(text1) => {
                    this.setState({ title: text1 });
                    
                  }}
                  value = {this.state.title}/>
                <TextInput style = {styles.inputBox}
                placeholder={"Author"}
                onChangeText={(text) => {
                    this.setState({ author: text });
                  }}
                  value = {this.state.author}/>
                <TextInput style = {[styles.inputBox, {height: 400}]} multiline={true}
                placeholder={"Write Story Here"}
                onChangeText={(text2) => {
                    this.setState({ story: text2 });
                  }}
                  value = {this.state.story}/>

                <TouchableOpacity style={styles.button}
                    onPress={() =>
                    {
                        this.submitStory(this.state.author, this.state.title, this.state.story);
                
                }}>
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
      },
      
      button: {
        marginLeft: 50,
        marginTop: 50,
        width: 120,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    
      buttonText: {
        fontFamily: 'Arial',
        fontSize: 14,
        textAlign: 'center',
        color:'red'
      },
})