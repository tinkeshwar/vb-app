import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/api';
import { INavigation } from '../app/interface';
import { KeyBoardAvoidingWrap } from '../components';
import { notifyError } from '../helper';
import { loadUserProfile, logUser, selectLoading, setLoading } from '../store';
import { app, styles } from '../styles';
import { LoginResponseType } from '../type';

export const Login = ({navigation}: INavigation) => {

  const dispatch = useDispatch()
  const loading: boolean = useSelector(selectLoading)
  const [email, setEmail] = useState<string|undefined>()
  const [password, setPassword] = useState<string|undefined>()

  const handleSubmit = async () => {
    if(!email || !password){
      notifyError('Empty', 'Please enter email and password.')
      return false
    } 
    dispatch(setLoading(true))
    const data = {
        email,
        password
    }
    const api: LoginResponseType = await login(data) as any
    if(api !==undefined && api?.user?.id){
        dispatch(logUser(api))
        await AsyncStorage.setItem('token', api.token)
        await AsyncStorage.setItem('refresh', api.refresh)
        dispatch(loadUserProfile())
    }
    dispatch(setLoading(false))
  }

  const registerHandle = () => {
    navigation.navigate('Register')
  }

  const bookHandle = () => {
    navigation.navigate('Book')
  }

  return (
    <KeyBoardAvoidingWrap>
      <View style={styles.Container}>
          <Text style={styles.Title1}>Sign In</Text>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                placeholder='E-mail'
                onChangeText={text => setEmail(text)}
                value={email||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={text =>setPassword(text)}
                value={password ||''}
                placeholderTextColor={app.color.grey}
                underlineColorAndroid='transparent'
            />
          </View>
          {loading && <ActivityIndicator
            style={{ marginTop: 30 }}
            size={'large'}
            animating={loading}
            color={app.color.warning}
          />}
          {!loading && <TouchableOpacity style={styles.ButtonContainer} onPress={()=>notifyError('Waiting', 'Not Implemented')}>
            <Text>Forget password?</Text>
          </TouchableOpacity>}
          {!loading &&<TouchableOpacity style={styles.ButtonContainer} onPress={handleSubmit}>
            <Text style={styles.ButtonPrimary}>Sign In</Text>
          </TouchableOpacity>}
          {!loading && <TouchableOpacity style={styles.ButtonContainer} onPress={registerHandle}>
            <Text>Don't have account? Sign Up Now</Text>
          </TouchableOpacity>}
          {!loading && <TouchableOpacity style={styles.ButtonContainer} onPress={bookHandle}>
            <Text>Visitor Book Access!</Text>
          </TouchableOpacity>}
    </View>
    </KeyBoardAvoidingWrap>
  )
}