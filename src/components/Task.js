import React from "react"
import {View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import communStyles from '../communStyles'


export default props => {

    const doneOrNotStyles = props.dateDone != null 
        ?{textDecorationLine:'line-through'}
        :{}

    const date = props.dateDone ? props.dateDone : props.dateEstimate
    const dateFormated = moment(date).locale('pt-br').format('ddd, D [ de ] MMMM')

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.dateDone)}
                </View>
            </TouchableWithoutFeedback>
            
            <View >
                <Text style={[styles.descricao,doneOrNotStyles]}>{props.desc}</Text>
                <Text style={[styles.date]}>{dateFormated + ""}</Text>
            </View>
            
        </View>
    )
}

function getCheckView(dateDone){
    if(dateDone != null){
        return (
            <View style={styles.done}>
                <Icon name="check" size={20} color='#FFF'></Icon>
            </View>
        )
    }else{
        return (
            <View style={styles.pending}></View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor:'#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical:10
    },
    checkContainer: {
        width:'20%',
        alignItems:'center',
        justifyContent: 'center'
    },
    pending:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#555',

    },
    done:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        backgroundColor:'#4d7944',
        alignItems: 'center',
        justifyContent: 'center'

    },
    descricao:{
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.mainText,
        fontSize:15
    },
    date:{
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.subText,
        
    }
})