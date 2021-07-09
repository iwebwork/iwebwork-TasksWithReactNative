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
import TomorrowImage from '../../assets/imgs/tomorrow.jpg'
import WeekImage from '../../assets/imgs/week.jpg'
import MonthImage from '../../assets/imgs/month.jpg'


import axios from 'axios'
import {server,showError, showSuccess} from '../common'

const initialState = {
    showDoneTasks: true,
    visibleTasks:[],
    tasks:[],
    showAddTask:false,
    img:null,
    colorBtnAdd:''
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
        this.alterImage()
        this.alterColorPlusBtn()
    }

    alterImage = () => {
        if(this.props.daysAhead === 0)
            this.setState({img:todayImage})
        else if(this.props.daysAhead === 1)
            this.setState({img:TomorrowImage})
        else if(this.props.daysAhead === 7)
            this.setState({img:WeekImage})
        else
            this.setState({img:MonthImage})
        
    }

    alterColorPlusBtn = () => {
        if(this.props.daysAhead === 0)
                this.setState({colorBtnAdd: communStyles.colors.iconArea})
        else if(this.props.daysAhead === 1)
                this.setState({colorBtnAdd: '#FFA500'})
        else if(this.props.daysAhead === 7)
                this.setState({colorBtnAdd: 'rgb(0,110,0)'})
        else
            this.setState({colorBtnAdd: 'rgb(0,0,190)'})
                
        
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTasks)
            this.alterImage()
            this.alterColorPlusBtn()

        }catch (e){
            showError(e + ' - Caiu aquii dois')
        }
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks )
        this.alterImage()
        this.alterColorPlusBtn()
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

    toggleTask = async id => {
        try {
            await axios.put(`${server}/toggleTasks/${id}`)
            this.loadTasks()

        } catch (error) {
            showError(error)
        }
    }

    addTasks = async (newTask) => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados invalidos', 'Descrição não informada')
            return 
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                dateEstimate:newTask.date
            })
            this.setState({showAddTask: false}, this.loadTasks)
        } catch (error) {
            showError(error)
        }

    }

    deleteTask = async (id) => {
        try {
            await axios.delete(`${server}/tasks/${id}`)
            this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }

    render(){

        const date = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return(
            <View style={styles.container}>
                <AddTask 
                    modalIsVisible={this.state.showAddTask}
                    modalOnCancel={() => this.setState({showAddTask:false})}
                    modalOnSave={this.addTasks}
                />
                <ImageBackground 
                        source={this.state.img}
                        style={styles.background}
                >
                    <View style={styles.iconBar}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon 
                                name={'bars'}
                                size={25} color={communStyles.colors.secondary}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.toggleFilter}
                        >
                            <Icon 
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={25} color={communStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.textTitleBar}>{this.props.title}</Text>
                        <Text style={styles.subTitle}>{date}</Text>
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
                <TouchableOpacity style={[styles.plusButton, {backgroundColor:this.state.colorBtnAdd}]}
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
        justifyContent: 'space-between',
        marginTop:10,
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
    }

    
})