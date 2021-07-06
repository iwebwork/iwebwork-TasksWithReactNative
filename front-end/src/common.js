import {Alert} from 'react-native'

const server = 'http://url:porta'

function showError(err){
    Alert.alert('Ops, ocorreu um problema!', `Mensagem: ${err}`)
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}
