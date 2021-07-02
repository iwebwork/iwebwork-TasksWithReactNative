import React, { Component} from 'react'
import { 
    Modal, View, StyleSheet, TouchableWithoutFeedback, Text,
    TouchableOpacity, TextInput, Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import communStyles from '../communStyles'
import moment from 'moment'

const initialState = {
    desc:'',
    date:new Date(),
    showDatePicker: false
}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    saveTask = () => {
        const newTask = {
            desc:this.state.desc,
            date:this.state.date
        }

        if(this.props.modalOnSave) this.props.modalOnSave(newTask)
        
        this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker
            value = {this.state.date}
            onChange = {(_, date) => {
                var statusDate = date !== undefined
                if(statusDate)
                    this.setState({date, showDatePicker: false})
            }}
            mode = 'date'
        />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
        
       
        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker : true})}>
                        <Text style={styles.datePicker}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.modalIsVisible}
                onRequestClose={this.props.modalOnCancel}
                animationType='slide'

            >
                <TouchableWithoutFeedback
                    onPress={this.props.modalOnCancel}
                >
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder={"Informe a descrição"}
                        value={this.state.desc}
                        onChangeText={desc => this.setState({desc})}
                    />                    
                    
                    {this.getDatePicker()}

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={this.props.modalOnCancel}
                        >
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.saveTask}
                        >
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.modalOnCancel}
                >
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor:'rgba(0,0,0, 0.7)'
    },
    container: {
        backgroundColor:'#FFF',
    },
    header:{
        fontFamily:communStyles.fontFamily,
        fontSize:communStyles.fontSize,
        backgroundColor:communStyles.colors.today,
        color:communStyles.colors.secondary,
        textAlign:'center',
        padding:10,
    },
    input:{
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:2,
        width:'90%',
        margin:15,
        fontFamily:communStyles.fontFamily,

    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button:{
        margin:15,
        color:communStyles.colors.today,
        alignItems: 'flex-end'
    },
    datePicker:{
        fontFamily:communStyles.fontFamily,
        fontSize:communStyles.fontSize,
        textAlign: 'center',
        padding: 20,
    }
})