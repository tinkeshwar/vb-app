import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider } from './src/app/context';
import { UserProfileResponseType } from './src/type';
import { loadUserProfile, selectAuthProfile } from './src/store';
import { Main } from './src/screen/Main';

export default function Root() {
  const dispatch = useDispatch()
  const user: UserProfileResponseType = useSelector(selectAuthProfile)
  const [appReady, setAppReady] = useState<boolean>(false)

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token){
      dispatch(loadUserProfile())
    }
  }

  if(!appReady && !Object.keys(user).length){
    return (
      <AppLoading
        startAsync={checkAuth}
        onFinish={()=>setAppReady(true)}
        onError={()=>console.warn}
      />
    )
  }
  return (
    <UserProvider value={user}>
        <Main/>
    </UserProvider>
  );
}