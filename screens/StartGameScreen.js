import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

import { globalIndexes as limit } from "../constants/constants";
import { useFetchPokemon } from "../hooks/useFetchpokemon";
 
 const StartGameScreen = ({ onStartGame }) => {
     
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(undefined)

    const [name, setName] = useState(undefined)
    const [poke, setPoke]=useState({name:'', img:''})

    const numberInputHandler = input => {
        setEnteredValue(input.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if(isNaN(chosenNumber) || chosenNumber <= limit.MIN_INDEX || chosenNumber > limit.MAX_INDEX) return
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        setPokemon()
    }

    const setPokemon = async () => {
        const [name, img] = await useFetchPokemon(enteredValue);
        setName(name)

        setPoke({name: name, img: img})
    } 

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card>
                <Text>You selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button
                    title='Ready to start game?'
                    onPress={ () => onStartGame(selectedNumber) }
                    color={Colors.tertiary}
                />
                <Text>{name}</Text>
                <Image style={styles.pokeImage} source={{uri:poke.img}}/>
            </Card>
            
        )
    }

    return (
     <View style={styles.screen}>
        <Card>
            <Text style={styles.title}>Select a Number</Text>
            <Input
                style={styles.input}
                blurOnSubmit //Android
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="number-pad"
                maxLenght={3}
                onChangeText={numberInputHandler}
                value={enteredValue}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button 
                        style={styles.button}
                        title="Reset"
                        color={Colors.secondary}
                        onPress={resetInputHandler}
                    />
                </View>
                <View style={styles.button}>
                    <Button 
                        style={styles.button}
                        title="Confirm"
                        color={Colors.primary}
                        onPress={confirmInputHandler}
                    />  
                </View> 
            </View>
        </Card>
        {confirmedOutput}
        
     </View>
   )
 }

 const styles = StyleSheet.create({
     selectedContainer: {
         marginTop: 20,
         alignItems: 'center',
         justifyContent: 'center'
     },
     screen: {
         flex: 1,
         padding: 10,
         alignItems: 'center'
     },
     title: {
         fontSize: 20,
         marginVertical: 10,
     },
     button:{
         with: 100,
     },
     buttonContainer:{
         flexDirection: 'row',
         width: '100%',
         justifyContent: 'space-between',
         paddingHorizontal: 15,
     },
     input: {
         width: 50,
         textAlign: 'center'
     },
     pokeImage:{
         width:100, 
         height:100
     }

 })

 export default StartGameScreen;