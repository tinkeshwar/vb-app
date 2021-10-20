import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { INavigation } from '../../app/interface';
import UserContext from '../../app/context';
import { UserProfileResponseType } from '../../type';
import { app, styles } from '../../styles';
import { Home } from './Home';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setProfile } from '../../store';
import { promptAlert } from '../../helper';
import { Visitor } from './Visitor';
import { Department } from '../departments';
import { Employee } from '../employees';

const Tab = createBottomTabNavigator()

export const Dashboard = ({navigation}:INavigation) => {
    const dispatch = useDispatch()
    const user = useContext(UserContext) as UserProfileResponseType

    const handleLogout = async () => {
        promptAlert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            async ()=>{
                await AsyncStorage.clear()
                dispatch(setProfile({} as UserProfileResponseType))
            },
            ()=>{}
        )
    }

    return (
        <Tab.Navigator>
            <Tab.Group
                screenOptions={{ 
                    headerStyle: { backgroundColor: 'white' },
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.HeaderRight}>
                                <FontAwesome5 name={'sign-out-alt'} size={30} color={'white'}/>
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            >
                <Tab.Screen 
                    name="UserDashboard" 
                    component={Home} 
                    options={{
                        title: 'Dashboard', 
                        tabBarLabelPosition: 'below-icon',
                        headerStyle: {
                            backgroundColor: app.color.primary,
                        },
                        headerTintColor: app.color.white,
                        tabBarActiveTintColor: app.color.primary,
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon:()=><FontAwesome5 
                            name={'home'} size={30} color={app.color.primary}
                        />
                    }}
                />
                <Tab.Screen 
                    name="Department" 
                    component={Department} 
                    options={{
                        title: 'Departments', 
                        tabBarLabelPosition: 'below-icon',
                        headerStyle: {
                            backgroundColor: app.color.primary,
                        },
                        headerTintColor: app.color.white,
                        tabBarActiveTintColor: app.color.primary,
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon:()=><FontAwesome5 
                            name={'building'} size={30} color={app.color.primary}
                        />
                    }}
                />
                <Tab.Screen 
                    name="Employees" 
                    component={Employee} 
                    options={{
                        title: 'Employees', 
                        tabBarLabelPosition: 'below-icon',
                        headerStyle: {
                            backgroundColor: app.color.primary,
                        },
                        headerTintColor: app.color.white,
                        tabBarActiveTintColor: app.color.primary,
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon:()=><FontAwesome5 
                            name={'users'} size={30} color={app.color.primary}
                        />
                    }}
                />
                <Tab.Screen 
                    name="Vistor" 
                    component={Visitor} 
                    options={{
                        title: 'Visitors', 
                        tabBarLabelPosition: 'below-icon',
                        headerStyle: {
                            backgroundColor: app.color.primary,
                        },
                        headerTintColor: app.color.white,
                        tabBarActiveTintColor: app.color.primary,
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon:()=><FontAwesome5 
                            name={'user'} size={30} color={app.color.primary}
                        />
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}