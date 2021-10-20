import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native'

export const KeyBoardAvoidingWrap = ({children}:{children: any}) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Platform.OS === 'web' ? ()=>{} :Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})