import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListProducts from './ListProducts';
import { getLastProductsApi } from '../../api/product';

export default function NewProducts() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getLastProductsApi();
            setProducts(response);
        })( )
    }, []);

    return (
        <View style = {styles.container}> 
            <Text style = {styles.title}>Nuevos productos</Text>
            {products && < ListProducts products = {products} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        marginTop: 20
    }, title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    }
})