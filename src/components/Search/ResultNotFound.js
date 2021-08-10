import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ResultNotFound(props) {
    const { search } = props;
    return (
        <View style = {styles.container}>
            <Text style = {styles.searchText}>No hay resultado para {search}.</Text>
            <Text style = {styles.otherText}>Revisa la ortografía o usa términos más generales.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10
    }, searchText: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
        marginBottom: 5
    }, otherText: {
        fontSize: 14,
        padding: 5
    }
})