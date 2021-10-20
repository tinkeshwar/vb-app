import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createEmployee } from '../../app/api'
import { INavigation } from '../../app/interface'
import { KeyBoardAvoidingWrap } from '../../components'
import { notifyError, notifySuccess } from '../../helper'
import { loadDepartmentDropdown, loadEmployees, selectDepartmentDropdown, selectEmployeePage, selectLoading, setLoading } from '../../store'
import { app, styles } from '../../styles'
import {Picker} from '@react-native-picker/picker';
import { DepartmentResponseType } from '../../type'

export const AddEmployee = ({navigation}:INavigation) => {

    const dispatch = useDispatch()
    const loading: boolean = useSelector(selectLoading)
    const page: number = useSelector(selectEmployeePage)
    const departments: DepartmentResponseType[] = useSelector(selectDepartmentDropdown)

    const [firstname, setFirstname] = useState<string|undefined>()
    const [middlename, setMiddleName] = useState<string|undefined>()
    const [lastname, setLastname] = useState<string|undefined>()
    const [phone, setPhone] = useState<string|undefined>()
    const [email, setEmail] = useState<string|undefined>()
    const [department, setDepartment] = useState<string|undefined>();

    const handleSubmit = async () => {
        if(!firstname || !email || !phone){
            notifyError('Empty', 'First name, email and phone fields are required.')
            return
        }
        dispatch(setLoading(true))
        const post = {
            firstname,
            middlename,
            lastname,
            email,
            phone,
            department
        }
        const response = await createEmployee(post)
        if(response.id){
            notifySuccess('Congratulations','Employee added successfully.')
            dispatch(loadEmployees(page, 10))
            navigation.navigate('EmployeeList', {})
        }
        dispatch(setLoading(false))
    }

    useEffect(()=>{
        dispatch(loadDepartmentDropdown())
    },[dispatch])

    return (
      <KeyBoardAvoidingWrap>
        <SafeAreaView style={styles.Container}>
          <Text style={styles.Title1}>Add Employee</Text>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                placeholder='First Name'
                onChangeText={text => setFirstname(text)}
                value={firstname||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                placeholder='Middle Name'
                onChangeText={text => setMiddleName(text)}
                value={middlename||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                placeholder='Last Name'
                onChangeText={text => setLastname(text)}
                value={lastname||''}
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
          <View style={styles.InputView}>
            <TextInput
                keyboardType={'numeric'}
                style={styles.InputBody}
                placeholder='Phone'
                onChangeText={text => setPhone(text)}
                value={phone||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.InputView}>
            <Picker
              style={Platform.OS === 'ios'?{}:styles.InputBody}
              selectedValue={department}
              onValueChange={(value)=>{
                setDepartment(value)
              }}
            >
              {departments.map((departmentItem, index)=>{
                return <Picker.Item key={`department-key-${index}`} color={app.color.primary} label={departmentItem.name} value={departmentItem.id} />
              })}
            </Picker>
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
