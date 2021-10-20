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

export const Book = ({navigation}: INavigation) => {

  const dispatch = useDispatch()
  const loading: boolean = useSelector(selectLoading)
  const [password, setPassword] = useState<string|undefined>()

  const handleSubmit = async () => {
    if(!password){
      notifyError('Empty', 'Please enter a valid code.')
      return false
    } 
    dispatch(setLoading(true))
    const data = {
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

  const loginHandle = () => {
    navigation.navigate('Login')
  }

  return (
    <KeyBoardAvoidingWrap>
      <View style={styles.Container}>
          <Text style={styles.Title1}>Visitor Book</Text>
          <View style={styles.InputView}>
            <TextInput
                style={styles.InputBody}
                secureTextEntry={true}
                placeholder='Code'
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
          {!loading &&<TouchableOpacity style={styles.ButtonContainer} onPress={handleSubmit}>
            <Text style={styles.ButtonPrimary}>Submit</Text>
          </TouchableOpacity>}
          {!loading && <TouchableOpacity style={styles.ButtonContainer} onPress={loginHandle}>
            <Text>Go Back To Sign In!</Text>
          </TouchableOpacity>}
    </View>
    </KeyBoardAvoidingWrap>
  )
}