import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Price(props) {
    const { price, discount } = props;

    const calcPrice = (price, discount) => {
        if(!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    };

    return (
        <View>
            {!!discount && (
            <View style = {styles.container}>
                <View style = {styles.containerData}>
                    <Text style = {styles.dataText}>Precio recomendado:</Text>
                </View>
                <View style = {styles.containerData}>
                    <Text style = {styles.dataValue} style = {styles.oldPrice}>US$ {((price)).toFixed(2)}</Text>
                </View>
            </View>
            )}

             <View style = {styles.container}>
                <View style = {styles.containerData}> 
                    <Text style = {styles.dataText}>Precio:</Text>
                </View>
                <View style = {styles.containerData}>
                    <Text style = {styles.dataValue} style = {styles.currentPrice}>US$ {calcPrice(price, discount)}</Text>
                </View>
            </View> 

            {!!discount && (
                <View style = {styles.container}>
                <View style = {styles.containerData}>
                        <Text style = {styles.dataText}>Ahorras:</Text>
                    </View>
                    <View style = {styles.containerData}>
                        <Text style = {[styles.dataValue, styles.saving]}>US$ {((price*discount)/100).toFixed(2)} ({discount}%)
                        </Text>
                    </View>
            </View> 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3
    }, containerData: {
        width: "50%",
        padding: 3
    }, dataText: {
        fontSize: 15,
        color: '#747474',
        textAlign: 'right'
    }, dataValue: {
        width: "60%",
        fontSize: 17,
    }, oldPrice: {
        textDecorationLine: 'line-through'
    }, currentPrice: {
        fontSize: 17,
        color: '#bc0e0d'
    }, saving: {
        color: '#bc0e0d'
    }
});