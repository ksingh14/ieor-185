/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  Animated,
  PanResponder,
  Image,
  TouchableHeight,
  TextInput,
  ScrollView,
  TouchableHighlight,
  AsyncStorage, 
  TouchableOpacity
} from 'react-native';
import { NavigationBar } from 'navigationbar-react-native';

import clamp from 'clamp';
import Dimensions from 'Dimensions';

import Header from './src/header';
import Container from './src/components/Container';
import Button from './src/components/Button';
import Label from './src/components/Label';

const Persons = [
  {name: 'Grand Slam', image: 'https://i.imgur.com/q75n3Pv.png'},
  {name: 'No Hitter', image: 'https://i.imgur.com/BwC4ZhE.png'},
  {name: 'Score Inning', image: 'https://i.imgur.com/sSt2TAA.png'},
  {name: 'Win Game', image: 'https://i.imgur.com/s9HH7Tc.png'}
]

// How far the swipe need to go for a yes/ no to fire
var SWIPE_THRESHOLD = 120;
// To get the stack effect the lower card must pick out at the bottom and appear smaller
var NEXT_CARD_POSITION_OFFSET = 4;
var NEXT_CARD_SIZE_OFFSET = 8;

/*
const ComponentLeft = () => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-start'}} >
       <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}}>
        <Image 
          source={require('./scores.png')}
          style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }}
          onPress={() => this.props.navigator.push({id: 'SwipeCards'})}/>
      </TouchableOpacity>
    </View>
  );
};
 
const ComponentCenter = () => {
  return(
    <TouchableOpacity onPress={() => this.props.navigator.push({id: 'SwipeCards'})}>
       <Image
        source={require('./placingBet.png')}
        style={{resizeMode: 'contain', width: 200, height: 35, alignSelf: 'center' }}
        onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
    </TouchableOpacity>
  );
};
 
const ComponentRight = () => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-end', }}>
      <TouchableOpacity>
        <Image 
          source={require('./userImage.png')}
          style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }}
          onPress={() => this.props.navigator.push({id: 'ProfilePage'})}/>
      </TouchableOpacity>
    </View>
  );
};
*/


class App extends Component {
  render() {
    return (
      <Navigator initialRoute = {{id: 'Login'}}
      renderScene = {this.renderScene.bind(this)} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    switch (routeId) {
      case 'Login':
        return (<Login navigator = {navigator} />);
      case 'SwipeCards':
        return (<SwipeCards navigator = {navigator} />);
      case 'ProfilePage':
        return (<ProfilePage navigator = {navigator} />);
      case 'MakeBet':
        return (<MakeBet navigator = {navigator} />)
    }
  }

}

class Login extends Component {

  state = {'username': '', 'password': ''};

  render() {
    return (
        <ScrollView style={styles.scroll}>
            <Container>
                <Button 
                    label="Forgot Login/Pass" 
                    styles={{button: styles.alignRight, label: styles.label}} 
                    onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
            </Container>

            <Container>
                  <Label text="Username or Email" />
                <TextInput
                    style={styles.textInput}
                    value={this.state.username}
                    onChangeText={ (username) => this.setState({ username }) }
                />
            </Container>
            <Container>
                <Label text="Password" />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({ password }) }
                />
            </Container>

            <Container>
                <Button 
                    styles={{button: styles.transparentButton}}
                    onPress={() => this.props.navigator.push({id: 'SwipeCards'})}
                >
                </Button>
            </Container>
   
            <View style={styles.footer}>
                <Container>
                    <Button 
                        label="Sign In" 
                        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                        onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
                </Container>

                <Container>
                    <Button 
                        label="Save Data" 
                        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                        onPress={this._storeItem.bind(this)} />
                </Container>

                <Container>
                    <Button 
                        label="View Profile" 
                        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                        onPress={() => this.props.navigator.push({id: 'ProfilePage'})} />
                </Container>


                <Container>
                    <Button 
                        label="CANCEL" 
                        styles={{label: styles.buttonBlackText}} 
                        onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
                </Container>
            </View>
        </ScrollView>
    );
  }

  async _storeItem () {
  try {
    const username = this.state.username;
    await AsyncStorage.setItem('userData', username);
  } catch (error) {
    console.log(error);
  }
}
}

/*class OptionScreen extends Component {
  render() {
    //two buttons
    return (
      );
  }
}
class MakeBet extends Component {
  constructor() {
    super()
    //global var for self bet here
  }
  render() {
    return (
      );
  }
}*/



class Bar2 extends Component {
  render() {
    return (

        <View style = {styles.bar2}>
          <View style = {[styles.barItem, styles.barSeparator]}>
            <Text style = {styles.barTop}> 1000 </Text>
            <Text style = {styles.barBottom}> Tokens </Text>
          </View>

          <View style = {[styles.barItem, styles.barSeparator]}>
            <Text style = {styles.barTop}> 0 </Text>
            <Text style = {styles.barBottom}> Tokens Won </Text>
          </View>

          <View style = {styles.barItem}>
            <Text style = {styles.barTop}> 0 </Text>
            <Text style = {styles.barBottom}> Tokens Lost </Text>
          </View>

        </View>

    );
  }
}

class Header2 extends Component {

  state = { username: '' };

  async componentWillMount() {
    const usernameGet = await AsyncStorage.getItem('userData');
    if (usernameGet) {
      this.setState({ username: usernameGet });
    } else {
      this.setState({ username: false });
    }
  }

  render() {
    return (
      <Image style = {styles.headerBackgroundProf} source = {require('./userBackground.jpg')}>
        <View style = {styles.headerProf}>

          <View style = {styles.profilepicWrap}>
            <Image style = {styles.profilepic} source = {require('./userImage.png')} />
          </View>

          <Text style = {styles.name2}> {this.state.username} </Text>

        </View>
      </Image>
    );
  }
}



class ProfilePage extends Component {
  
  renderScene(route, navigator) {
    var routeId = route.id;
    switch (routeId) {
      case 'Login':
        return (<Login navigator = {navigator} />);
      case 'SwipeCards':
        return (<SwipeCards navigator = {navigator} />);
      case 'ProfilePage':
        return (<ProfilePage navigator = {navigator} />);
      case 'MakeBet':
        return (<MakeBet navigator = {navigator} />)
    }
  }

  render() {
    const ComponentLeft = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-start'}} >
           <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}} onPress={() => this.props.navigator.push({id: 'MakeBet'})}>
            <Image 
              source={require('./scores.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'MakeBet'})} />
          </TouchableOpacity>
        </View>
      );
    };
     
    const ComponentCenter = () => {
      return(
        <TouchableOpacity onPress={() => this.props.navigator.push({id: 'SwipeCards'})}>
           <Image
            source={require('./placingBet.png')}
            style={{resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
            onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
        </TouchableOpacity>
      );
    };
     
    const ComponentRight = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity onPress={() => this.props.navigator.push({id: 'ProfilePage'})}>
            <Image 
              source={require('./userImage.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'ProfilePage'})} />
          </TouchableOpacity>
        </View>
      );
    };



    return (
      <View style = {styles.container}>
      <NavigationBar 
          componentLeft     = { () =>  <ComponentLeft />   }
          componentCenter   = { () =>  <ComponentCenter /> }
          componentRight    = { () =>  <ComponentRight />  }
          navigationBarStyle= {{ backgroundColor: '#215e79' }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#215e79' }}
        />
        <Header2 />
        <Bar2 />
      </View>

    );
  }
}


//TODO
class MakeBet extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  
  renderScene(route, navigator) {
    var routeId = route.id;
    switch (routeId) {
      case 'Login':
        return (<Login navigator = {navigator} />);
      case 'SwipeCards':
        return (<SwipeCards navigator = {navigator} />);
      case 'ProfilePage':
        return (<ProfilePage navigator = {navigator} />);
      case 'MakeBet':
        return (<MakeBet navigator = {navigator} />)
    }
  }

  render() {
    const ComponentLeft = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-start'}} >
           <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}} onPress={() => this.props.navigator.push({id: 'MakeBet'})}>
            <Image 
              source={require('./scores.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'MakeBet'})} />
          </TouchableOpacity>
        </View>
      );
    };
     
    const ComponentCenter = () => {
      return(
        <TouchableOpacity onPress={() => this.props.navigator.push({id: 'SwipeCards'})}>
           <Image
            source={require('./placingBet.png')}
            style={{resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
            onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
        </TouchableOpacity>
      );
    };
     
    const ComponentRight = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity onPress={() => this.props.navigator.push({id: 'ProfilePage'})}>
            <Image 
              source={require('./userImage.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'ProfilePage'})} />
          </TouchableOpacity>
        </View>
      );
    };



    return (
      <View style = {styles.container}>
      <NavigationBar 
          componentLeft     = { () =>  <ComponentLeft />   }
          componentCenter   = { () =>  <ComponentCenter /> }
          componentRight    = { () =>  <ComponentRight />  }
          navigationBarStyle= {{ backgroundColor: '#215e79' }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#215e79' }}
        />
        <TextInput 
          style={styles.textInput}
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.setState({text})}
          value = {this.state.text}
        /> 

      </View>

    );
  }
}

class Card extends Component {
  render() {
    return (
      <View style={styles.cardResizeContainer}>
        <Animated.View style={[styles.cardContainer, this.props.animatedCardContainerStyles]}>
          <Animated.View style={[styles.card, this.props.animatedCardStyles]} {...this.props.panResponder}>
            <Image source={{uri: this.props.image}} style={styles.cardImage}>
              <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer, this.props.animatedYupStyles]}>
                <Text style={[styles.cardImageText, styles.cardImageYupText]}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer, this.props.animatedNopeStyles]}>
                <Text style={[styles.cardImageText, styles.cardImageNopeText]}>DISLIKE</Text>
              </Animated.View>
            </Image>
            <View style={styles.cardLabelContainer}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.value}>100$</Text>
            </View>
          </Animated.View>   
        </Animated.View>
      </View>
    );
  }
}

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      cards: Persons,
      currentPosition: 0,
    }
  }

  // we use a circular queue
  _goToNextPerson() {
    let nextPosition = (this.state.currentPosition + 1) % this.state.cards.length
    this.setState({currentPosition: nextPosition});
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
  //   Animated.timing(this.state.nextCardOpacity, {
  //            toValue: 1,
  //      }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.99
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this._goToNextPerson();
  }

  handleNopePress() {
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100

      Animated.timing(this.state.pan, {
            toValue: {x: -panlength, y: 0}
      }).start(this._resetState.bind(this))
  }

  handleYupPress() {
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100

      Animated.timing(this.state.pan, {
            toValue: {x: panlength, y: 0}
      }).start(this._resetState.bind(this))

  }

  renderScene(route, navigator) {
    var routeId = route.id;
    switch (routeId) {
      case 'Login':
        return (<Login navigator = {navigator} />);
      case 'SwipeCards':
        return (<SwipeCards navigator = {navigator} />);
      case 'ProfilePage':
        return (<ProfilePage navigator = {navigator} />);
      case 'MakeBet':
        return (<MakeBet navigator = {navigator} />)
    }
  }

  render() {
    let { pan, cards, currentPosition} = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({inputRange: [-240, 0, 240], outputRange: ["-30deg", "0deg", "30deg"]});

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp'});
    let animatedNopeStyles = {opacity: nopeOpacity}

    let card0AnimatedStyles = {
      animatedCardStyles: animatedCardStyles, 
      animatedNopeStyles: animatedNopeStyles,
      animatedYupStyles: animatedYupStyles
    }

    // card 1 animation
    let card1BottomTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, -NEXT_CARD_POSITION_OFFSET, 0], extrapolate: 'clamp'});
    let card1SideTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, NEXT_CARD_SIZE_OFFSET, 0], extrapolate: 'clamp'});
    let card1TopTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET, 0], extrapolate: 'clamp'});
    let card1TranslationStyles = {top: card1TopTranslation, bottom: card1BottomTranslation, right: card1SideTranslation, left: card1SideTranslation}
    let card1AnimatedStyles = {
      animatedCardContainerStyles: card1TranslationStyles
    }

    // card 2 animation
    let card2BottomTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [-NEXT_CARD_POSITION_OFFSET, -NEXT_CARD_POSITION_OFFSET*2, -NEXT_CARD_POSITION_OFFSET], extrapolate: 'clamp'});
    let card2SideTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [NEXT_CARD_SIZE_OFFSET, NEXT_CARD_SIZE_OFFSET*2, NEXT_CARD_SIZE_OFFSET], extrapolate: 'clamp'});
    let card2TopTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET, (NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET)*2, NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET], extrapolate: 'clamp'});
    let card2TranslationStyles = {top: card2TopTranslation, bottom: card2BottomTranslation, right: card2SideTranslation, left: card2SideTranslation}
    let card2AnimatedStyles = {
      animatedCardContainerStyles: card2TranslationStyles
    }

    let card3AnimatedStyles = {
      animatedCardContainerStyles: {top: (NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET)*2, bottom: -NEXT_CARD_POSITION_OFFSET*2, right: NEXT_CARD_SIZE_OFFSET*2, left: NEXT_CARD_SIZE_OFFSET*2}
    }


    let person0 = cards[currentPosition]
    let person1 = cards[(currentPosition+1) % cards.length]
    let person2 = cards[(currentPosition+2) % cards.length]
    let person3 = cards[(currentPosition+3) % cards.length]

    // if the layout appears a little strange. it was born out of the trickiness in doing the following
    // at the same time ...

    // 1. the card should always appear on top when being dragged so needs to be rendered near the end 
    // (at least after the buttons)
    // 2. the layout should be responsive
    // 3. the buttons need to work ofc - we have to be careful about rendering a view on top of them

    // also note that we render 4 cards for the 'stack' effect. while dragging 3 cards appear under 
    // (but only 2 cards at pan=0)

    const ComponentLeft = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-start'}} >
           <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}} onPress={() => this.props.navigator.push({id: 'MakeBet'})}>
            <Image 
              source={require('./scores.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'MakeBet'})} />
          </TouchableOpacity>
        </View>
      );
    };
     
    const ComponentCenter = () => {
      return(
        <TouchableOpacity onPress={() => this.props.navigator.push({id: 'SwipeCards'})}>
           <Image
            source={require('./placingBet.png')}
            style={{resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
            onPress={() => this.props.navigator.push({id: 'SwipeCards'})} />
        </TouchableOpacity>
      );
    };
     
    const ComponentRight = () => {
      return(
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity onPress={() => this.props.navigator.push({id: 'ProfilePage'})}>
            <Image 
              source={require('./userImage.png')}
              style={{ resizeMode: 'contain', width: 100, height: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigator.push({id: 'ProfilePage'})} />
          </TouchableOpacity>
        </View>
      );
    };


    return (
      <View style={styles.bodyContainer}>
      <NavigationBar 
          componentLeft     = { () =>  <ComponentLeft />   }
          componentCenter   = { () =>  <ComponentCenter /> }
          componentRight    = { () =>  <ComponentRight />  }
          navigationBarStyle= {{ backgroundColor: '#215e79' }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#215e79' }}
        />
        <View style={styles.responsiveContainer}>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button, styles.buttonNope]} underlayColor='#EEE' onPress={() => {this.handleNopePress()}}>
                  <Text style={styles.nopeText}>Dislike</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button, styles.buttonYup]} underlayColor='#EEE' onPress={() => {this.handleYupPress()}}>
                  <Text style={styles.yupText}>Like</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.cardsContainer}>
            <Card key={person3.name} {...person2} {...card3AnimatedStyles}/>
            <Card key={person2.name} {...person2} {...card2AnimatedStyles}/>
            <Card key={person1.name} {...person1} {...card1AnimatedStyles} />
            <Card key={person0.name} {...person0} {...card0AnimatedStyles} panResponder={this._panResponder.panHandlers}/>
          </View>

        </View>   
      </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // main container
  bodyContainer: {
    flex: 1,
    //margin: 10,
    backgroundColor: '#F5FCFF',
  },

  // we keep the bottom button sections at height 100
  // the card expands to take up all the rest of the space
  responsiveContainer: {
    flex: 1,
    paddingBottom: 100,
  },

  // cards
  cardsContainer: {
    flex: 1,
  },

  cardResizeContainer: {
    flex: 1,
    position: 'absolute',
    top: 40,
    left: 40,
    bottom: 40, 
    right: 40,
  },

  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0, 
    right: 0,
    justifyContent: 'flex-end',
  },

  card: {   
    position: 'relative',
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 8,  
    flex: 1,
    //overflow: 'hidden',
    shadowRadius: 2,
    shadowColor: '#BBB',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },

  cardImage: {
    flex: 1,
    borderRadius: 8,
  },

  cardImageTextContainer: {
    position: 'absolute',
    borderWidth: 3,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4,
    opacity: 0,
  },
  cardImageYupContainer : {
    top: 40,
    left: 40,
    transform:[{rotate: '-20deg'}],
    borderColor: 'green',
    
  },
  cardImageNopeContainer : {
    top: 40,
    right: 40,
    transform:[{rotate: '20deg'}],
    borderColor: 'red',
  },
  cardImageText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  cardImageNopeText: {
    color: 'red',
    backgroundColor: 'rgba(0,0,0,0)', 
  },
  cardImageYupText: {
    color: 'green',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  cardLabelContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    //borderColor: "#999",
    borderRadius: 8,
    //borderBottomWidth: 2,
    padding: 8,
  },
  name: {
    fontWeight: 'bold',
    color: '#999',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#999',
  },
  
  // buttons

  buttonsContainer: {
    height:100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 5,
  },
  buttonNope: {
    borderColor: 'red',
  },
  buttonYup: {
    borderColor: 'green',
  },
  yupText: {
    fontSize: 20,
    color: 'green',
  },
  nopeText: {
    fontSize: 20,
    color: 'red',
  },

  //User Page
  headerBackgroundProf: {
    flex: 1,
    width: null,
    alignSelf: 'stretch'
  },
  headerProf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  profilepicWrap: {
    width: 180,
    height: 180, 
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 16
  },
  profilepic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch', 
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4
  },
  name2: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff', 
    fontWeight: 'bold'
  },

  bar2: {
    borderTopColor: '#fff',
    borderTopWidth: 4,
    backgroundColor: '#ec2e4a',
    flexDirection: 'row'
  },
  barSeparator: {
    borderRightWidth: 4
  },
  barItem: {
    flex: 1,
    padding: 18,
    alignItems: 'center'
  },
  barTop: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  barBottom: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }


});

AppRegistry.registerComponent('ReactNativeTinderSwipe', () => App);