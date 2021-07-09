import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import Menu from './screens/Menu'
import AuthOrApp from './screens/AuthOrApp'

import communStyles from './communStyles'

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions:{
        labelStyle:{
            fontFamily:communStyles.fontFamily,
            fontWeight:'normal',
            fontSize:20
        },
        activeLabelStyle:{
            fontWeight:'bold',
            color:'rgb(0,120,0)'
        }
    }
}

const menuRoutes = {
    Today:{
        name:'Today',
        screen: props => <TaskList {...props} title='Hoje' daysAhead={0} />,
        navigationOptions: {
            title:'Hoje',
        }
    },
    Tomorrow:{
        name:'Tomorrow',
        screen: props => <TaskList {...props} title='Amanhã' daysAhead={1} />,
        navigationOptions: {
            title:'Amanhã',
        }
    },
    Week:{
        name:'Week',
        screen: props => <TaskList {...props} title='Semana' daysAhead={7} />,
        navigationOptions: {
            title:'Semana',
        }
    },
    Month:{
        name:'Month',
        screen: props => <TaskList {...props} title='Mês' daysAhead={30} />,
        navigationOptions: {
            title:'Mês',
        }
    },
}

const menuNavigatior = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
    AuthOrApp:{
        name:'AuthOrApp',
        screen:AuthOrApp
    },

    Auth:{
        name:'Auth',
        screen:Auth
    },
    Home:{
        name:'Home',
        screen:menuNavigatior
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName:'AuthOrApp'
})

export default createAppContainer(mainNavigator)