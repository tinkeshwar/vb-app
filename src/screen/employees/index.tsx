import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmployeeList } from './EmployeeList';
import { AddEmployee } from './AddEmployee';
import { ShowEmployee } from './ShowEmployee';

export const Employee = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName={'EmployeeList'}>
            <Stack.Screen name={'EmployeeList'} component={EmployeeList} options={{headerShown: false}} />
            <Stack.Screen name={'AddEmployee'} component={AddEmployee} options={{headerShown: false}} />
            <Stack.Screen name={'ShowEmployee'} component={ShowEmployee} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}