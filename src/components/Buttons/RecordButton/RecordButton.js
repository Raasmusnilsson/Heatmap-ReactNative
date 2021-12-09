import React from 'react'
import {Button} from "react-native-elements";
import {ButtonStyles} from "../button.styles";
import {RecordButtonStyles} from "./recordButton.styles";

const {buttonShadow} = ButtonStyles
const {title, button} = RecordButtonStyles

const RecordButton = (props) => {
    return (
        <Button
            title={'●'}
            containerStyle={buttonShadow}
            buttonStyle={button}
            titleStyle={title}
            {...props}
        />
    )
}

export default RecordButton
