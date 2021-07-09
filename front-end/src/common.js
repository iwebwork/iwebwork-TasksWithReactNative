import {Alert} from 'react-native'

const server = 'http://192.169.0.112:3000'

function showError(err){
    if(err.response && err.response.data){
        Alert.alert('Ops, ocorreu um problema!', `${err.response.data}`)
    }else{
        Alert.alert('Ops! Ocorreu um erro inesperado!', 'Tente novamente, caso persista, contate nosso suporte!')
    }
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}
