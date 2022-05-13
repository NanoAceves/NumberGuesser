import React, {useState, useRef, useEffect} from 'react'
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/Colors';

import { direction_ as d} from '../constants/constants';
import { useFetchPokemon } from "../hooks/useFetchpokemon";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    console.log('min, max', min, max)
  
    const randNum = Math.random() * (max - min) + min;
    const randNumFloored = Math.floor(randNum);
  
    if (randNumFloored === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return randNumFloored;
    }
  }
  

const GameScreen = ({selectedNumber, onGameOver}) => {

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(currentLow.current, currentHigh.current, selectedNumber));

    const [rounds, setRounds] = useState(0)

    const [name, setName] = useState(undefined)
    const [img, setImg]=useState(undefined)

    useEffect(() => {
      if(currentGuess === selectedNumber) {
        onGameOver(rounds, currentGuess)
      }
    }, [currentGuess])
    

    console.log(currentGuess);

    const setPokemon = async () => {
      const [name] = await useFetchPokemon(currentGuess);
      setName(name)
      const [img]=await useFetchPokemon(currentGuess);
      setImg(img)
    } 

    const nextGuess = direction => {
        if( (direction === d.higher && currentGuess > selectedNumber ) ||
        (direction === d.lower && currentGuess < selectedNumber)) {
            
            alert('Pls don\t lie')
            return
        }

        if(direction === d.lower) {
          currentHigh.current = currentGuess;
        } else {
          currentLow.current = currentGuess;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setRounds(currentRounds => setRounds(currentRounds + 1))
        setCurrentGuess(nextNum);
        setPokemon()

    }

  return (
    <View style={styles.screen}>
      <Text>Computer Guess: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
          <Button title='Lower' color={Colors.secondary} onPress={ () => {nextGuess(d.lower)} } />
          <Button title='Higher' color={Colors.primary} onPress={ () => {nextGuess(d.higher)} } />
      </Card>
      <Card style={styles.pokemonContainer}>
        {name}
        {img}
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  pokemonContainer:{
    alignItems: 'center',
  }
})

export default GameScreen