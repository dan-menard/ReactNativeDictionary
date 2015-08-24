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
  ScrollView,
} = React;

var WORDNIK_URL_BASE = 'http://api.wordnik.com:80/v4/word.json/';
var SECRETS = require('./secrets.json')

var Dictionary = React.createClass({
  getInitialState: function() {
    return {
      inputText: '',
      resultJSX: <Text></Text>
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
        resultJSX: <Text>{'Loooking up "' + state.inputText + '"...'}</Text>
      };
    });

    fetch(WORDNIK_URL_BASE + text + "/definitions?api_key=" + SECRETS.api_key)
      .then((response) => {
        this.setState((state) => {
          var results = [];

          for (let result of JSON.parse(response._bodyText)) {
            results.push(
              <View style={styles.container}>
                <Text style={styles.definitionType}>{result.partOfSpeech}</Text>
                <Text style={styles.definition}>{result.text}</Text>
                <Text style={styles.definitionSource}>{result.attributionText}</Text>
              </View>
            );
          }

          return {
            resultJSX:
              <ScrollView>{results}</ScrollView>
          };
        });
      })
      .catch((error) => console.warn(error));
  },

  render: function() {
    return (
      <ScrollView style={[styles.container, styles['container--main']]}>
        <TextInput
          autoCapitalize="none"
          style={styles.wordPrompt}
          value={this.state.inputText}
          onChange={(event) => this.updateText(event.nativeEvent.text)}
          onEndEditing={() => this.lookUp(this.state.inputText)}
        />

        {this.state.resultJSX}
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 20
  },

  'container--main': {
    margin: 20,
    marginTop: 40
  },

  wordPrompt: {
    height: 40,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1
  },

  definition: {
    marginTop: 5,
    marginBottom: 5
  },

  definitionType: {
    fontStyle: 'italic'
  },

  definitionSource: {
    color: 'gray'
  }
});

AppRegistry.registerComponent('Dictionary', () => Dictionary);
