import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth} from '../services/config';
const HomeScreen = ({navigation}) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    })
    // Prevents the component from rendering its content until the authentication state is determined.
    if (initializing) return null;
  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.heading1}>Welcome To Flora Click</Text>
                <Text style={styles.subheading1}>scan any plant and add it to your collection</Text>
            </View>

            <View style={styles.floralImg}>
                <Image source={require(`../assets/floral.jpeg`)} style={{width: 300, height: 300}} />
            </View>
            {
                user 
                ? 
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>How to Use the App</Text>
                    <Text style={styles.step}>1. Click on the camera icon</Text>
                    <Text style={styles.step}>2. Take a picture of any plant you come across</Text>
                    <Text style={styles.step}>3. Add it to your collection</Text>
              </View>
                : 
                <View>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                        <Text >Don't have an account?</Text> 
                        <TouchableOpacity style={styles.signUnBtn} onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>   
                    </View>
                </View>
            }



        </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        margin: 16,
    },
    heading1:{
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: '600'
    },
    subheading1:{
        textAlign: 'center',
        fontSize: 13,
        marginVertical: 5,
        // textDecorationLine: 'underline',
        // fontStyle: 'italic',
        fontWeight: '400'

    },
    floralImg:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 200,
        marginVertical: 20,
    },
    loginBtn:{
        backgroundColor: '#EADFB8',
        padding: 10,
        marginHorizontal: 80,
        borderRadius: 70,
        marginVertical: 16,
    },
    loginText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: "center",
    },
    signUpContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    signUnBtn:{
        backgroundColor: '#E88E9A',
        padding: 7,
        borderRadius: 20,

    },
    signUpText:{
        fontWeight: '600',
        textAlign: 'center',
        color: 'white'
    },
    welcome:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 20,
    },
    instructionsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        elevation: 4, // Adds shadow for Android
        shadowColor: '#000', // Shadow properties for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    instructionsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333333',
      },
    step: {
        fontSize: 16,
        marginVertical: 8,
        color: '#555555',
      },


})
// TODO: create the logic for login/sign up - authorization
// TODO: only after authorized, user can then access the profile screen
// TODO: connect to database logic