import React, { Component } from 'react';
import {ActivityIndicator, Alert, View, Text, Button, ViewPagerAndroid, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

class MoviesList extends Component{
  render(){
    if(this.props.status){

      return(
          <FlatList data={this.props.data.movies} extraData={this.state} keyExtractor={(item, index) => item.id} renderItem={({item})=> <Text style={{fontSize: 20}}>{item.title} : {item.releaseYear}</Text>} />
        )
    }
    else
      return null;
  }
}


export default class FlexDirectionBasics extends Component {
    constructor(props){
    super(props);
    this.state= {
      isOn: true,
      movies: "",
      getList: false,
    }

    this.handleMovies = this.handleMovies.bind(this);
    setInterval(()=>{
        if(this.state.isOn)
          this.setState({isOn: false})
        else 
          this.setState({isOn: true})
          }, 1000)
  }

  componentDidMount(){

    axios.get("https://facebook.github.io/react-native/movies.json").then(function(res){
      this.setState({movies: res.data})
    }.bind(this)).catch(function(err){
      console.error(err);
    });
  }

  handleMovies(event){
    this.setState({getList: true})
    Alert.alert("Go Next =>")
  }

  render() {

    if(this.state.isOn)
      var txt = "Mah Nigga!"
    else
      txt = "";
    return (
      // Try setting `flexDirection` to `column`.
      <ViewPagerAndroid style={{flex: 1}} initialPage={0} >
     
      <View style={{flex: 1}} key = "1">

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, flex: 1, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, flex: 1, backgroundColor: 'steelblue'}} />
        </View>

        <View>
          <View style={{height: 100, backgroundColor: 'skyblue'}} />
          <View style={{height: 100, backgroundColor: 'steelblue', alignItems: 'center',justifyContent: 'center'}}>
            <Text style={styles.textStyle}>🍕Yo!</Text>
            <Text style={styles.textStyle}>{txt}</Text>
          </View>
          <View style={{height: 100, backgroundColor: 'powderblue'}} /> 
        </View>
        
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, flex: 1, backgroundColor: 'steelblue'}} />
          <View style={{width: 50, flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'powderblue'}}>
            <Button onPress={() => {Alert.alert('Nigga! Go back & eat Pizza!')}} color="#841584" title="Here's a Secret!"/>
          </View>
          <View style={{width: 50, flex: 1, backgroundColor: 'skyblue'}} />
        </View>

      </View>

      <View key="2" style={styles.page2}>
        <ActivityIndicator />
        <Text style={styles.textStyle}> Go Back Finish Pizza Stupid!</Text>
        <Button onPress={this.handleMovies} color="#841584" title="Get Movies"/>
      </View> 

      <View key="3" style={styles.moviesPage}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 50}}> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}> {this.state.movies.title}</Text>
          <Text style={{fontSize: 15}}> {this.state.movies.description} </Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <MoviesList status={this.state.getList} data={this.state.movies} />
        </View>
      </View>

      </ViewPagerAndroid>

    );
  }
};

const styles = StyleSheet.create({
  page2 : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "orange",
  },

  textStyle :{
    fontSize: 25,
    fontWeight: 'bold',
  },

  moviesPage : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "violet"
  }


});

