import React from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployee, statusEmployee } from '../../app/api'
import { INavigation } from '../../app/interface'
import { promptAlert } from '../../helper'
import { loadEmployee, loadEmployees, selectEmployee, selectEmployeePage, selectLoading, setLoading } from '../../store'
import { styles } from '../../styles'
import { EmployeeResponseType } from '../../type'

export const ShowEmployee = ({navigation}:INavigation) => {

    const dispatch = useDispatch()
    const department: EmployeeResponseType = useSelector(selectEmployee)
    const loading: boolean = useSelector(selectLoading)
    const page: number = useSelector(selectEmployeePage)

    const markHandle = async (id: number) => {
        dispatch(setLoading(true))
        await statusEmployee(id)
        dispatch(loadEmployees(page, 100))
        dispatch(loadEmployee(id))
        dispatch(setLoading(false))
    }

    const editHandle = async (id: number) => {
        dispatch(setLoading(true))
        
        dispatch(setLoading(false))
    }

    const deleteHandle = async (id: number) => {
        dispatch(setLoading(true))
        promptAlert(
            'Delete Confirmation',
            'Are you sure you want to delete?',
            async ()=>{
                await deleteEmployee(id)
                setTimeout(()=>{
                    dispatch(loadEmployees(page, 100))
                    navigation.navigate('EmployeeList')
                    dispatch(setLoading(false))
                },1000)
            },
            ()=>{
                dispatch(setLoading(false))
            }
        )
    }

    return (
        <SafeAreaView >
            <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
                <TouchableOpacity style={styles.ButtonContainer}
                    onPress={()=>editHandle(department.id)}
                >
                    <Text style={styles.ButtonPrimary}><FontAwesome5Icon name={'pen'}/> Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer}
                    onPress={()=>deleteHandle(department.id)}
                >
                    <Text style={styles.ButtonDanger}><FontAwesome5Icon name={'trash'}/> Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonContainer}
                    onPress={()=>markHandle(department.id)}
                >
                    <Text style={styles.ButtonDark}><FontAwesome5Icon name={!department.status?'toggle-off':'toggle-on'}/> {!department.status?'Activate':'Deactivate'}</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator />}
            {!loading && <ScrollView style={styles.ShowContainer}>
                <View style={styles.ShowContent}>
                    <Text style={styles.ShowLabel}>Name</Text>
                    <Text style={styles.ShowValue}>{department.firstname} {department.middlename||''} {department.lastname||''}</Text>
                </View>
                <View style={styles.ShowContent}>
                    <Text style={styles.ShowLabel}>Email</Text>
                    <Text style={styles.ShowValue}>{department.email}</Text>
                </View>
                <View>
                    <Text style={styles.ShowLabel}>Phone</Text>
                    <Text style={styles.ShowValue}>{department.phone}</Text>
                </View>
            </ScrollView>}
        </SafeAreaView>
    )
}