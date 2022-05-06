import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

const GameOverScreen = ({rounds}) => {
  return (
      <View style={styles.screen}>
          <Text>The game is over</Text>
          <Text>Took me: {rounds} rounds</Text>
      </View>
  )
}
const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center',
    },
  });

export default GameOverScreen