import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  const [selectedNumber, setSelectedNumber]=useState(undefined)
  const [numberOfGuesses, setNumberOfGuesses]=useState(0)

  const gameOverHandler=(rounds)=>{
    setNumberOfGuesses(rounds)
  }

  const startGameHandler = (number) => {
    setSelectedNumber(number);
  }

  let content=<StartGameScreen onStartGame={startGameHandler}/>
  if(selectedNumber && numberOfGuesses===0){
    content=<GameScreen selectedNumber={selectedNumber} onGameOver={gameOverHandler}/>
  }else if(selectedNumber && numberOfGuesses>0){
    content=<GameOverScreen rounds={numberOfGuesses}/>
  }


  return (
    <View style={styles.screen}>
      <Header title={"Guess the number"}/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection:'column',
    flex: 1
  },
});
