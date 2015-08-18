/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var WORDNIK_URL_BASE = 'http://api.wordnik.com:80/v4/word.json/';
var SECRETS = require('./secrets.json')

var Dictionary = React.createClass({
  getInitialState: function() {
    return {
      inputText: '',
      resultText: ''
    };
  },

  updateText: function(newText) {
    this.setState((state) => {
      return {
        inputText: newText
      };
    });
  },

  lookUp: function(text) {
    this.setState((state) => {
      return {
        resultText: 'Loooking up "' + state.inputText + '"...'
      };
    });

    fetch(WORDNIK_URL_BASE + text + "/definitions?api_key=" + SECRETS.api_key)
      .then((response) => {
        this.setState((state) => {
          return {
            resultText: JSON.parse(response._bodyText)[0].text
          };
        });
      })
      .catch((error) => console.warn(error));
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={this.state.inputText}
          onChange={(event) => this.updateText(event.nativeEvent.text)}
          onEndEditing={() => this.lookUp(this.state.inputText)}
        />

        <Text style={styles.instructions}>
          {this.state.resultText}
        </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('Dictionary', () => Dictionary);
