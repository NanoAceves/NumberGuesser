import React, {useState, useRef, useEffect} from 'react'
import {Button, StyleSheet, Text, View, Alert} from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

import Constants from '../constants/constants';

const generateRandomBetween=(min, max, exclude)=>{
    min =Math.ceil(min);
    max=Math.floor(max);

    const randNum=Math.random()*(max-min)+min;
    const randNumFloored=Math.floor(randNum);

    if(randNum==exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return randNumFloored;
    }
}

const GameScreen = ({selectedNumber, onGameOver}) => {
    const currentLow=useRef(1);
    const currentHigh=useRef(100);
    const [currentGuess, setCurrentGuess]=useState(generateRandomBetween(currentLow.current,currentHigh.current,selectedNumber))
    
    const [rounds, setRounds]=useState(0)

    useEffect(()=>{
        if (currentGuess===selectedNumber){
            onGameOver(rounds)
        }
    }, [currentGuess])

    const nextGuess=direction=>{
        console.log('direction, selected number', direction, selectedNumber)
        if( (direction === Constants.direction.higher && currentGuess > selectedNumber ) || (direction === Constants.direction.lower && currentGuess < selectedNumber))
        {
           //  Alert("(if you are justice) Please do not lie", [{text: "Sorry"}])
            alert("please, do not lie")
            return
        }
        if(direction===Constants.direction.lower){
            currentHigh.current=currentGuess;
        }else{
            currentLow.current=currentGuess;
        }
        const nextNum=generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setRounds(currentRounds=>setRounds(currentRounds+1))
        setCurrentGuess(nextNum);

    }

return (
    <View style={styles.screen}>
        <Text>Computer guess: </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <Button title='Lower' onPress={ () => {nextGuess(Constants.direction.lower)} } />
            <Button title='Higher' onPress={ () => {nextGuess(Constants.direction.higher)} } />
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center',
    },buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
    }
  });
export default GameScreen