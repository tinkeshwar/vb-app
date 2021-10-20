import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepartmentList } from './DepartmentList';
import { AddDepartment } from './AddDepartment';
import { ShowDepartment } from './ShowDepartment';

export const Department = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName={'DepartmentList'}>
            <Stack.Screen name={'DepartmentList'} component={DepartmentList} options={{headerShown: false}} />
            <Stack.Screen name={'AddDepartment'} component={AddDepartment} options={{headerShown: false}} />
            <Stack.Screen name={'ShowDepartment'} component={ShowDepartment} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}