import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { useState } from 'react'

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = () => {

    const [enteredValue, setEnteredValue]=useState('')
    const numberInputHandler=input=>(
        setEnteredValue(input.replace(/[^0-9]/g, ''))
    )

  return (
    <View style={styles.screen}>
        <Card>
            <Text style={styles.title}>Select a Number</Text>
            <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="number-pad"
                maxLen={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Reset"
                        color={Colors.primary}
                        onPress={()=>{}}
                    />
                </View>
                
                <View style={styles.button}>
                    <Button
                        title="Confirm"
                        color={Colors.secondary}
                        onPress={()=>{}}
                    />
                </View>
            </View>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
      flex:1,
      padding:10,
      alignItems:'center',
      flexDirection:'column'
  },
  title:{
      fontSize:20,
      marginVertical:10,
  },
  button:{

  },
  buttonContainer:{
      flexDirection:'row',
      width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:15,  
  },
  input:{
      width:50,
      textAlign:'center'
  },
});

export default StartGameScreen