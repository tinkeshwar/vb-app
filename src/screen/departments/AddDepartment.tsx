import React, { useState } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment } from '../../app/api'
import { INavigation } from '../../app/interface'
import { KeyBoardAvoidingWrap } from '../../components'
import { notifyError, notifySuccess } from '../../helper'
import { loadDepartments, selectDepartmentPage, selectLoading, setLoading } from '../../store'
import { app, styles } from '../../styles'

export const AddDepartment = ({navigation}:INavigation) => {

    const dispatch = useDispatch()
    const loading: boolean = useSelector(selectLoading)
    const page: number = useSelector(selectDepartmentPage)

    const [name, setName] = useState<string|undefined>()
    const [email, setEmail] = useState<string|undefined>()

    const handleSubmit = async () => {
        if(!name || !email){
            notifyError('Empty', 'All field are required.')
            return
        }
        dispatch(setLoading(true))
        const post ={
            name,
            email
        }
        const response = await createDepartment(post)
        if(response.id){
            notifySuccess('Congratulations','Department added successfully.')
            dispatch(loadDepartments(page, 10))
            navigation.navigate('DepartmentList', {})
        }
        dispatch(setLoading(false))
    }

    return (
      <KeyBoardAvoidingWrap>
        <SafeAreaView style={styles.Container}>
          <Text style={styles.Title1}>Add Department</Text>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                placeholder='Name'
                onChangeText={text => setName(text)}
                value={name||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.InputView}>
            <TextInput
              autoCapitalize={'none'}
                style={styles.InputBody}
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          {loading && <ActivityIndicator
            style={{ marginTop: 30 }}
            size={'large'}
            animating={loading}
            color={app.color.primary}
          />}
          {!loading &&<TouchableOpacity style={styles.ButtonContainer} onPress={handleSubmit}>
            <Text style={styles.ButtonPrimary}>Add</Text>
          </TouchableOpacity>}
        </SafeAreaView>
      </KeyBoardAvoidingWrap>
    )
}
