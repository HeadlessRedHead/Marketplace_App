import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { deleteProductCartApi, increaseProductCartApi, decreaseProductCartApi } from "../../api/cart"
import { API_URL } from '../../utils/constants';
import colors from '../../styles/colors';

export default function Product(props) {
    const { product, setReloadCart } = props;

    const calcPrice = (price, discount) => {
        if(!discount) return (price).toFixed(2);
        const discountAmount = (price * discount)/100;
        return (price - discountAmount).toFixed(2);
    };

    const deleteProductCart = async () => {
        const response = await deleteProductCartApi(product._id);
        if(response) setReloadCart(true);
    };

    const increaseProductCart = async () => {
        const response = await increaseProductCartApi(product._id);
        if(response) setReloadCart(true);
    }

    const decreaseProductCart = async () => {
        const response = await decreaseProductCartApi(product._id)
        if(response) setReloadCart(true);
    }

    return (
        <View style = {styles.product}>
            <View style = {styles.containerImage}>
                <Image style = {styles.image} source = {{uri: `${API_URL}${product.main_image.url}`}} />
            </View>
            <View style = {styles.info}>
                <View>
                    <Text style = {styles.name} numberOfLines = {3} ellipsizeMode = 'tail' >{product.title}</Text>
                    <View style = {styles.price}>
                        <Text style = {styles.currentPrice}>
                            US$ {calcPrice(product.price, product.discount)}
                        </Text>
                    </View>
                    {!!product.discount && (
                        <View style = {styles.containerDiscount}>
                            <Text style = {styles.discountTitle}>Ahorras: </Text>
                            <Text style = {styles.discountValue}>US${((product.price * product.discount)/100).toFixed(2)} ({product.discount} %)</Text>
                        </View>
                    )}
                </View>
                <View style = {styles.btnContainer}>
                    <View style = {styles.selectQuantity}>
                        <IconButton 
                            icon = "plus" 
                            color = '#fff' 
                            size = {18} 
                            style = {styles.btnQuantity}
                            onPress = {increaseProductCart} />
                        <TextInput 
                            style = {styles.inputQuantity} 
                            value = {product.quantity.toString()} />
                        <IconButton 
                            icon = "minus" 
                            color = '#fff' 
                            size = {18} 
                            style = {styles.btnQuantity}
                            onPress ={decreaseProductCart} />
                    </View>
                    <Button mode = "contained" color = {colors.danger} onPress = {deleteProductCart} >
                        Eliminar
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#C7CCD2'
    }, containerImage: {
        width: '40%',
        height: 200,
        backgroundColor: '#E3E5E8',
        padding: 5
    }, image: {
        height: '100%',
        resizeMode: "contain"
    }, info: {
        padding: 10,
        width: '60%',
        justifyContent: "space-between"
    }, name: {
        fontSize: 16
    }, price: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end"
    }, currentPrice: {
        fontSize: 22,
        color: '#bc0e0d'
    }, oldPrice: {
        textDecorationLine: 'line-through',
        fontSize: 16,
        marginLeft: 7,
        color: '#747474'
    }, btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative", 
        width: "100%"
    }, btnQuantity: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 0
    }, btnDelete: {
        backgroundColor: colors.danger,
        borderRadius: 5,
        margin: 5,
        width: 60,
        height: 32
    }, loading: {
        backgroundColor: '#000',
        opacity: 0.4,
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        justifyContent: "center"
    }, selectQuantity: {
        flexDirection: "row",
        alignItems: "center"
    }, inputQuantity: {
        paddingHorizontal: 5,
        fontSize: 18
    }, containerDiscount: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5
    }, discountTitle: {
        fontSize: 14,
        color: "#747474"
    }, discountValue: {
        fontSize: 16,
        color: "#747474",
        paddingLeft: 5
    }
});