import {Alert} from 'react-native'

const server = 'http://192.169.0.112:3000'

function showError(err){
    Alert.alert('Ops, ocorreu um problema!', `${err}`)
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}
