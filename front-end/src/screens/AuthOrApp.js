import React, { Component } from 'react'
import {
    View, ActivityIndicator, StyleSheet
} from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {server,showError, showSuccess} from '../common'


export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const userDateJson = await AsyncStorage.getItem('userDate')

        let userDate = null 
        try {
            userDate = JSON.parse(userDateJson)
        } catch (error) {
            showError(error)
        }

        if(userDate && userDate.token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${userDate.token}`
            this.props.navigation.navigate('Home', userDate)
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#111'
    }
})
