import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ResultNotFound() {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Carrito de compras</Text>
            <Text style = {styles.otherText}>No tienes productos en el carrito.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10
    }, title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
        marginBottom: 5
    }, otherText: {
        fontSize: 18,
        padding: 5
    }
})