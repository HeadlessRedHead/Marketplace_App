import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Order from './Order';
import { map } from 'lodash';

export default function ListOrder(props) {
    const { orders } = props;

    return (
        <View style = {styles.container}>
            {map(orders, (order) => (
                <Order key = {order._id} order = {order} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 40
    }
})