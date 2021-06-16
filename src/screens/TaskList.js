import React, { Component} from 'react'
import { View,Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import communStyles from '../communStyles'
import todayImage from '../../assets/imgs/today.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'


export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        visibleTasks:[],
        tasks:[
            {
                id:Math.random(),
                desc:'teste 1',
                dateEstimate:new Date(),
                dateDone:new Date() 
            },
            {
                id:Math.random(),
                desc:'teste 2',
                dateEstimate:new Date(),
                dateDone:null
            }
        ]
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

    componentDidMount = () => {
        this.filterTasks()
    }

    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return(
            <View style={styles.container}>
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
                            ({item}) => <Task {...item}
                            toggleTask={this.toggleTask}
                        />}
                    />
                </View>
                
                
            </View>
        )
    } 

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background:{
        flex: 3,
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
    }

    
})