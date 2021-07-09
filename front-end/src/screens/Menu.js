import React from 'react'
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import communStyles from '../communStyles'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {

    const optionsGravatar = {
        email: props.navigation.getParam('email'),
        secure: true
    }

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return (
        <ScrollView>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.header}>
                <Gravatar style={styles.avatar} options={optionsGravatar}/>
                <TouchableOpacity
                    onPress={logout}
                >
                <View style={styles.iconSignOut}>
                    <Icon name="sign-out" size={25} color='#800'/>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text>{props.navigation.getParam('name')}</Text>
               
            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingLeft:10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    avatar:{
        width: 50,
        height: 50,
        borderWidth: 3,
        borderRadius: 25,
    },
    info:{
        paddingBottom:5,
        paddingTop:5,
        paddingLeft:14,
        fontFamily:communStyles.fontFamily
    },
    title:{
        color: '#555',
        fontFamily:communStyles.fontFamily,
        fontSize:30,
        paddingTop:10,
        textAlign: 'center',
    },
    iconSignOut: {
        paddingRight:10
    }
})
