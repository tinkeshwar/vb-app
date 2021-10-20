import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from '../app/context';
import Toast from 'react-native-toast-message';
import { Login } from './Login';
import { Book } from './Book';
import { Dashboard } from './dashboard/Dashboard';

const Stack = createNativeStackNavigator();

export const Main = () => {
    return (
        <UserContext.Consumer>
            {(user)=>(
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={'Book'}>
                        {!user || user === undefined || Object.keys(user).length === 0 ? (
                            <>
                                <Stack.Screen name={'Login'} component={Login} options={{headerShown: false}} />
                                <Stack.Screen name={'Book'} component={Book} options={{headerShown: false}} />
                            </>
                        ) :  (user.access === 2 && user.firstname === 'visitor')?(
                            <>
                                <Stack.Screen name={'Visitor'} component={Book} options={{headerShown: false}} />
                            </>
                        ):(
                            <>
                                <Stack.Screen name={'Dashboard'} component={Dashboard} options={{headerShown: false}} />
                            </>
                        )}
                    </Stack.Navigator>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </NavigationContainer>
            )}
        </UserContext.Consumer>
        
    )
}