import React, {useState, useEffect, useRef, Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
export default class ProgressiveImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
