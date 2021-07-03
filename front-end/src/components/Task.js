import React from "react"
import {View, Text, StyleSheet, TouchableWithoutFeedback,TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'


import communStyles from '../communStyles'


export default props => {

    const doneOrNotStyles = props.dateDone != null 
        ?{textDecorationLine:'line-through'}
        :{}

    const date = props.dateDone ? props.dateDone : props.dateEstimate
    const dateFormated = moment(date).locale('pt-br').format('ddd, D [ de ] MMMM')
    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.rightSwipeable}
                onPress={() => props.onDelete && props.onDelete(props.id)}
            >
                <Icon
                    name="trash" size={30} color='#FFFF'
                />

            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return (
            <View style={styles.leftSwipeable}>
                <Icon
                    name="trash" size={30} color='#FFFF'
                />
                <Text style={styles.excludeText}>
                    Excluir
                </Text>

            </View>
        )
    }

    return(
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask && props.onToggleTask(props.id)}
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
        </Swipeable>
        
    )
}

function getCheckView(dateDone){
    if(dateDone != null){
        return (
            <View style={styles.done}>
                <Icon name="check" size={14} color='#FFF' style={styles.iconExclude}></Icon>
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
        paddingVertical:10,
        backgroundColor:'#FFF'
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
        
    },
    rightSwipeable:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal:20
    },
    leftSwipeable:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row',
        alignItems: 'center'

    },
    excludeText:{
        fontFamily:communStyles.fontFamily,
        color:'#FFFF',
        fontSize:15,
        margin:10
    },
    iconExclude:{
        marginLeft:4
    }
})