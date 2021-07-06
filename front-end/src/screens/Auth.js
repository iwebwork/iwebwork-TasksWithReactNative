import React, { Component } from "react"
import {Text, ImageBackground, StyleSheet, View, TouchableOpacity, Alert} from "react-native"

import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import communStyles from '../communStyles'

import AuthInput from "../components/AuthInput"

import {server,showError, showSuccess} from '../common'

const api = axios.create({
    baseURL:server
})

const initialState = {
    email:'',
    password: '',
    name:'',
    confirmPassword: '',
    stageNew:false,
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrsignup = () => {
        if(this.state.stageNew){
            this.signup()
        }else{
            Alert.alert('Success', 'Logado!')
        }
    }

    signup = async() => {
        try {
            
            await api.post('/signup', {
                email:this.state.email,
                password: this.state.password,
                name:this.state.name,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastrado com sucesso!')
            this.setState({...initialState})

        }catch(e){
            showError(e)
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Login'}
                    </Text>
                    {
                        this.state.stageNew &&
                            <AuthInput icon={'user'} placeholder="Nome" value={this.state.name} style={styles.textInput}
                                onChangeText={name => this.setState({ name })}/>
                    }
                    <AuthInput icon={'at'} placeholder="E-mail" value={this.state.email} style={styles.textInput}
                        onChangeText={email => this.setState({ email })}/>
                    <AuthInput icon={'lock'} placeholder="Senha" value={this.state.password} style={styles.textInput}
                        onChangeText={password => this.setState({ password })} secureTextEntry={true}/>
                    
                    {
                        this.state.stageNew &&
                            <AuthInput icon={'lock'} placeholder="Confime sua senha" value={this.state.confirmPassword} style={styles.textInput}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })} secureTextEntry={true}/>
                    }

                    <TouchableOpacity onPress={this.signinOrsignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{padding:10}}
                    onPress={
                        () => this.setState({stageNew: !this.state.stageNew})
                    }
                >
                    
                    <Text style={styles.subTitleTwo}>
                        {this.state.stageNew ? 'Já possui uma conta?' : 'Quer se cadastrar?'}
                    </Text>

                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.primary,
        fontSize:60,
        marginBottom: 10,

    },
    subTitle:{
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.primary,
        fontSize:25,
        textAlign: 'center',
        marginBottom: 10,
    },
    subTitleTwo: {
        fontFamily:communStyles.fontFamily,
        color:communStyles.colors.primary,
        fontSize:20,
        textAlign: 'center',
        marginBottom: 10,
    },
    background: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput:{
        marginBottom:10,
        backgroundColor:'rgba(223,223,223, 0.9)',
        height:45
    },
    formContainer:{
        width:'95%',
        backgroundColor:'rgba(200,200,200, 0.4)',
        padding:20
    },
    button: {
        backgroundColor:'rgba(233,110,0,0.9)',
        marginTop:10,
        padding:10,
        alignItems:'center',
        borderRadius:15
    },
    buttonText:{
        fontFamily:communStyles.fontFamily,
        color:'#FFF',
        fontSize:18
    }
})
