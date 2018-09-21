import React from 'react';
import {Button, View, Image, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class LogoTitle extends React.Component{
  render() {
    return (
      <View>
      <Image
        source={require('./img/shop.jpg')}
        style={{ width: 25, height: 30, marginLeft:6, borderRadius:2}}
      />
      
        <Text style={{color:'red', fontSize:11, marginLeft:8}}>E-95</Text>
        
      </View>
        
      
    );
  }
}

class HomeScreen extends React.Component{
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle : <LogoTitle/>,
    headerRight: (
      <Button
        onPress={() => alert('This is a login button!')}
        title="Login"
        color="red"
      />
    ),
    
  };


  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
        <Text>
        Home Screen
      </Text>
      <Button title="Go to Details page"
              onPress={() => 
                this.props.navigation.navigate('Details',{
                number: 90,
                announce:"congragulation!! You have already to here."
              })}
              />
      </View>
    );
  }
}

class DetailsScreen extends React.Component{
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };
    
  render(){
    //get parameter inside out HomeScreen 
    const {navigation} = this.props;
    const ItemNum = navigation.getParam('number','No-ID');
    const announceStr = navigation.getParam('announce','some default value.');

    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Details Screen</Text>
        <Text>ItemId:{ItemNum}</Text>
        <Text>OtherParam:{announceStr}</Text>
        <Button title="Go to Detail.. Again!!"
            onPress={() =>
              this.props.navigation.push('Details',{
                 number: Math.floor(Math.random() * 100),
              })
            }
        />
        <Button title="Go to Home" 
            onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button title="Go Back"
            onPress={()=> this.props.navigation.goBack()}/>
        <Button
              title="Update the title"
               onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
  />
      </View>
    )
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen, 
  },
  {
    initialRouteName: 'Home',
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'black',
      },
      headerTintColor:'grey',
      headerTitleStyle:{
        fontWeight:'bold',
        backgroundColor:'blue',
        borderRadius: 5,
        padding: 5,
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
