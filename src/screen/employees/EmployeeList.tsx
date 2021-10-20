import React, { useEffect } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { INavigation } from '../../app/interface';
import { notifyError } from '../../helper';
import { selectLoading, loadEmployees, selectEmployees, selectEmployeePage, loadEmployee } from '../../store';
import { app, styles } from '../../styles';
import { EmployeeResponseType } from '../../type';

const Item = ({ item, navigation }: { item: EmployeeResponseType, navigation: any }) => {
    const dispatch = useDispatch()
    const handleRowClick = (id: number) => {
        dispatch(loadEmployee(id))
        navigation.navigate('ShowEmployee')
    }

    return (
        <View style={styles.ItemContent}>
            <View style={styles.ItemLeft}>
                <Text style={styles.ItemText}><FontAwesome5Icon name={'building'} color={item.status?app.color.primary:app.color.grey} size={25} /> {item.firstname} {item.middlename||''} {item.lastname||''}</Text>
                <Text style={{color:'#000', fontSize: 16, width: 'auto', marginTop:10}}>{item.email}</Text>
                <Text style={{color:'#000', fontSize: 14, width: 'auto', marginTop:10}}>{item.phone}</Text>
            </View>
            <TouchableOpacity style={styles.ItemRight} onPress={() => handleRowClick(item.id)}>
                <FontAwesome5Icon name={'chevron-right'} color={app.color.primary} size={20} />
            </TouchableOpacity>
        </View>
    )
};

export const EmployeeList = ({ navigation }: INavigation) => {

    const dispatch = useDispatch()
    const loading: boolean = useSelector(selectLoading)
    const buckets: EmployeeResponseType[] = useSelector(selectEmployees)
    const page: number = useSelector(selectEmployeePage)

    const handleAddButton = () => {
        navigation.navigate('AddEmployee')
    }

    useEffect(() => {
        dispatch(loadEmployees(page, 100))
    }, [dispatch, page])

    return (
        <SafeAreaView style={styles.Container}>
            {!loading && <TouchableOpacity style={styles.FloatingButtonContainer} onPress={handleAddButton}>
                <FontAwesome5Icon name={'plus'} size={20} color={app.color.white} />
            </TouchableOpacity>}
            {loading && <ActivityIndicator />}
            {!loading && <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={()=>dispatch(loadEmployees(page, 10))}
                    />
                }
                pagingEnabled={true}
                style={styles.ItemContainer}>
                {buckets.map((bucket: EmployeeResponseType, index: number) => {
                    return (<Item key={`item-${index}`} item={bucket} navigation={navigation} />)
                })}
            </ScrollView>}
        </SafeAreaView>
    )
}