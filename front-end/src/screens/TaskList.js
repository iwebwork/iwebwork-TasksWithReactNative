import React, { Component} from 'react'
import { View,Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import communStyles from '../communStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage'

import Task from '../components/Task'
import AddTask from '../screens/AddTask'
import todayImage from '../../assets/imgs/today.jpg'

import axios from 'axios'
import {server,showError, showSuccess} from '../common'

const api = axios.create({
    baseURL:server
})

const initialState = {
    showDoneTasks: true,
    visibleTasks:[],
    tasks:[],
    showAddTask:false,
}

export default class TaskList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const StorageState = await AsyncStorage.getItem('state')
        const state = JSON.parse(StorageState) || initialState
        this.setState({showDoneTasks: state.showAddTask}, this.filterTasks)
        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await api.get('/tasks?date='+maxDate)
            this.setState({tasks: res.data}, this.filterTasks)
        }catch (e){
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks )
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
            
        }else{
            const pending = task => task.dateDone === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('state', JSON.stringify(
            {
                showDoneTasks: this.state.showAddTask
            }
        ))
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task =>{
            if(task.id === id){
                task.dateDone = task.dateDone ? null : new Date()
            }
        })

        this.setState({tasks}, this.filterTasks)
    }

    addTasks = (newTask) => {
        // console.warn(newTask.desc.trim())
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados invalidos', 'Descrição não informada')
            return 
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id:Math.random(),
            desc:newTask.desc,
            dateEstimate:newTask.dateEstimate,
            dateDone:null
        })

        this.setState({tasks, showAddTask: false}, this.filterTasks)
    }

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return(
            <View style={styles.container}>
                <AddTask 
                    modalIsVisible={this.state.showAddTask}
                    modalOnCancel={() => this.setState({showAddTask:false})}
                    modalOnSave={this.addTasks}
                />
                <ImageBackground 
                        source={todayImage}
                        style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity
                            onPress={this.toggleFilter}
                        >
                            <Icon 
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={25} color={communStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.textTitleBar}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>

                </ImageBackground>
                
                <View style={styles.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={
                            ({item}) => 
                            <Task 
                                {...item}
                                onToggleTask={this.toggleTask}
                                onDelete={this.deleteTask}
                            />}
                    />
                </View>
                <TouchableOpacity style={styles.plusButton}
                    onPress={() => this.setState({showAddTask:true})}
                    activeOpacity={0.5}
                >
                    <Icon name="plus" size={20} color={communStyles.colors.primary} />
                </TouchableOpacity>
                
                
            </View>
        )
    } 

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background:{
        flex: 2,
    },

    taskList: {
        flex: 7,
    },
    titleBar:{
        flex:1,
        justifyContent: 'flex-end',
    },
    textTitleBar:{
        color:communStyles.colors.primary,
        fontSize:30,
        fontFamily:communStyles.fontFamily,
        marginLeft:20,
        marginBottom:20
    },
    subTitle:{
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.secondary,
        fontSize:15,
        marginLeft:20,
        marginBottom:20
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal:20,
        justifyContent: 'flex-end',
        marginTop:10
    },
    plusButton:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width:50,
        height:50,
        borderRadius:25,
        right:20,
        bottom:30,
        backgroundColor:communStyles.colors.iconArea
    }

    
})