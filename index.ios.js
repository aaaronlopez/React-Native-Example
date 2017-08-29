/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import branch, { RegisterViewEvent } from 'react-native-branch'

const defaultBUO = {
  title: 'wallo'
}

export default class AwesomeProject extends Component {
  
  buo = null

  state = {
    results: [],
  }

  componentWillUnmount() {
    if (!this.buo) return
    this.buo.release()
  }

  addResult(type, slug, payload) {
    let result = { type, slug, payload }
    this.setState({
      results: [result, ...this.state.results].slice(0, 10)
    })
  }

  createBranchUniversalObject = async () => {
    try {
      let result = await branch.createBranchUniversalObject('abc', defaultBUO)
      if (this.buo) this.buo.release()
      this.buo = result
      console.log('createBranchUniversalObject', result)
      this.addResult('success', 'createBranchUniversalObject', result)
    } catch (err) {
      console.log('createBranchUniversalObject err', err.toString())
      this.addResult('error', 'createBranchUniversalObject', err.toString())
    }
    console.log('clicked button')
  }

  showShareSheet = async () => {
    if (!this.buo) await this.createBranchUniversalObject()
    try {
      let result = await this.buo.showShareSheet()
      console.log('showShareSheet', result)
      this.addResult('success', 'showShareSheet', result)
    } catch (err) {
      console.log('showShareSheet err', err.toString())
      this.addResult('error', 'showShareSheet', err.toString())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          onPress={this.createBranchUniversalObject}
          title="createBranchUniversalObject"
          color="#841584"
        />
        <Button
          onPress={this.showShareSheet}
          title="showShareSheet"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
