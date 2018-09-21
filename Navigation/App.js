import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Text,
  View,
  StyleSheet,
} from 'react-native';


const SUPPORTS_NATIVE_FEEDBACK =
  Platform.OS === 'android' && Platform.Version >= 21;

const noop = () => {};
const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 };

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {!SUPPORTS_NATIVE_FEEDBACK && this._renderButtons()}
        {SUPPORTS_NATIVE_FEEDBACK && this._renderButtonsWithNativeFeedback()}
      </View>
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={noop}
          hitSlop={defaultHitSlop}>
          <Text style={styles.text}>This is opacity</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.button}
          onPress={noop}
          hitSlop={defaultHitSlop}
          underlayColor="red">
          <Text style={styles.text}>This is highlight</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderButtonsWithNativeFeedback() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableNativeFeedback
          onPress={noop}
          background={TouchableNativeFeedback.Ripple('blue', false)}
          hitSlop={defaultHitSlop}>
          <View style={styles.button}>
            <Text style={styles.text}>This is a ripple respecting borders</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={noop}
          background={TouchableNativeFeedback.Ripple('red', true)}
          hitSlop={defaultHitSlop}>
          <View style={styles.button}>
            <Text style={styles.text}>This is ripple without borders, this is more useful for icons, eg: in tab bar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 24,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    padding: 25,
    borderRadius: 5,
    backgroundColor: '#000',
    marginBottom: 30,
  },
});
