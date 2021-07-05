import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return(
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon}/>
            <TextInput {...props} style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'80%',
        backgroundColor:'#EEE',
        borderRadius:25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color:'#444',
        marginLeft:20,
    },
    input: {
        marginLeft:10,
        width:'100%'
    }
})