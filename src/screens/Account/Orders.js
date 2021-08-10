import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import StatusBar from '../../components/StatusBar';
import ListOrder from '../../components/Order/ListOrder';
import useAuth from '../../hooks/useAuth';
import { getOrderApi } from '../../api/orders';
import colors from '../../styles/colors'

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getOrderApi(auth);
                setOrders(response);
            })()
        }, [])
    );

    return (
        <>
            <StatusBar />
            <ScrollView style = {styles.container}>
                <Text style = {styles.title}>Mis pedidos</Text>
                {!orders ? (
                    <ActivityIndicator size = "large" style = {styles.loading} />
                ) : size(orders) === 0 ? (
                    <Text style = {styles.noOrderText}>Mis pedidos</Text>
                ) : (
                    <ListOrder orders = {orders} />
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }, title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
        marginBottom: 5
    }, loading: {
        marginTop: 20
    }, noOrderText: {
        textAlign: "center",
        fontSize: 18,
        padding: 5
    }
});