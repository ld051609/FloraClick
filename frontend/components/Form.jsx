import { View, Text, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StateContext } from '../app/stateContext'

const FormScreen = () => {
    const {characterImg, setCharacterImg} = useContext(StateContext)
    const onPressProfile = () => {
        // TODO: set character image from the selected picture
        setCharacterImg()

    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.profileImg}>
            {characterImg == null ?
            <Image source={require(`@expo/assets/profile`)}/> : 
            <Image source={require(`@expo/assets/${characterImg}`)}/>    
            }
        </View>

        <TouchableOpacity onPress={onPressProfile} style={style.characterIcons}>
            {characterImgArr.map((character, index) => {
                return <Image key={index} source={require(`@expo/assets/${character}`)}/>
            })}
            
        </TouchableOpacity>

        <TextInput required placeholder='Input your profile name' style={styles.inputField}></TextInput>
        {/* TODO: store the profile image and the profile name into the database */}
    </SafeAreaView>
  )
}

export default FormScreen
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'    
    },
    characterIcons: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'    
    },


})