import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import communStyles from '../communStyles'

export default props => {

    const optionsGravatar = {
        email: props.navigation.getParam('email'),
        secure: true
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar} options={optionsGravatar}/>
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
        paddingLeft:10
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
    }
})
