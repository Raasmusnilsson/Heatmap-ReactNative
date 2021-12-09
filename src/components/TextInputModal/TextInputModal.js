import {Text, ToastAndroid, View} from 'react-native'
import React, {useState} from 'react'
import {Button, Input, Overlay} from 'react-native-elements'
import {TextInputModalStyles} from './textInputModal.styles'
import axios from 'axios'
import {t} from "../../language/language";

const toastUnValidText = t('toast_unvalidtext')
const toastNoSendText = t('toast_nosendtext')
const toastSending = t('toast_sending')
const toastSuccess = t('toast_success')
const toastError = t('toast_error')

const cancel = t('cancel')
const send = t('send')
const sendAddress = t('server_address')
const headerPost = t('headerPostTitle')

const {
    cardView,
    buttonContainer,
    inputStyle,
    textCancelStyle,
    textSendStyle,
    buttons,
    headerPostStyle,
    buttonLineRight,
    overlayStyle
} = TextInputModalStyles


const TextInputModal = (props) => {
    const [textInput, setTextInput] = useState('')

    const handleOnChangeText = () => {
        if (textInput.length < 1) {
            ToastAndroid.show(toastUnValidText, ToastAndroid.SHORT)
            return null
        }
        if (props.points.points.length < 1) {
            ToastAndroid.show(toastNoSendText, ToastAndroid.SHORT)
            return null
        } else {
            postLogs()
            toggleOverlay()
        }
    }

    const postLogs = () => {
        ToastAndroid.show(toastSending, ToastAndroid.SHORT)
        axios
            .post(textInput, props.logs)
            .then(function (response) {
                if (response.status === 200) {
                    ToastAndroid.show(toastSuccess, ToastAndroid.SHORT)
                    props.points.setPoints([])
                }
            })
            .catch(function (error) {
                console.warn('Error: ', error)
                ToastAndroid.show(toastError, 30)
            })
    }

    const toggleOverlay = () => {
        props.visible.setTextInputVisible(!props.visible.textInputVisible)
    }

    return (
        <Overlay isVisible={props.visible.textInputVisible} style={cardView}
                 overlayStyle={overlayStyle}>
            <Text style={headerPostStyle}>{headerPost}</Text>
            <Input
                placeholder={sendAddress}
                style={inputStyle}
                value={textInput}
                onChangeText={(event) => setTextInput(event)}
            />
            <View style={buttonContainer}>
                <Button buttonStyle={[buttons, buttonLineRight]} titleStyle={textCancelStyle} title={cancel}
                        onPress={() => toggleOverlay()}/>
                <Button buttonStyle={buttons} titleStyle={textSendStyle} title={send}
                        onPress={() => handleOnChangeText()}/>
            </View>
        </Overlay>
    )
}

export default TextInputModal
