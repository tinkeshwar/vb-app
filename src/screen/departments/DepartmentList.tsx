import React, { useEffect } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { INavigation } from '../../app/interface';
import { selectLoading, loadDepartments, selectDepartments, selectDepartmentPage, loadDepartment } from '../../store';
import { app, styles } from '../../styles';
import { DepartmentResponseType } from '../../type';

const Item = ({ item, navigation }: { item: DepartmentResponseType, navigation: any }) => {
    const dispatch = useDispatch()
    const handleRowClick = (id: number) => {
        dispatch(loadDepartment(id))
        navigation.navigate('ShowDepartment')
    }

    return (
        <View style={styles.ItemContent}>
            <View style={styles.ItemLeft}>
                <Text style={styles.ItemText}><FontAwesome5Icon name={'building'} color={item.status?app.color.primary:app.color.grey} size={25} /> {item.name}</Text>
                <Text style={{color:'#000', fontSize: 16, width: 'auto', marginTop:10}}>{item.email}</Text>
            </View>
            <TouchableOpacity style={styles.ItemRight} onPress={()=>handleRowClick(item.id)}>
                <FontAwesome5Icon name={'chevron-right'} color={app.color.primary} size={20} />
            </TouchableOpacity>
        </View>
    )
};

export const DepartmentList = ({ navigation }: INavigation) => {

    const dispatch = useDispatch()
    const loading: boolean = useSelector(selectLoading)
    const buckets: DepartmentResponseType[] = useSelector(selectDepartments)
    const page: number = useSelector(selectDepartmentPage)

    const handleAddButton = () => {
        navigation.navigate('AddDepartment')
    }

    useEffect(() => {
        dispatch(loadDepartments(page, 100))
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
                        onRefresh={()=>dispatch(loadDepartments(page, 10))}
                    />
                }
                pagingEnabled={true}
                style={styles.ItemContainer}>
                {buckets.map((bucket: DepartmentResponseType, index: number) => {
                    return (<Item key={`item-${index}`} item={bucket} navigation={navigation} />)
                })}
            </ScrollView>}
        </SafeAreaView>
    )
}