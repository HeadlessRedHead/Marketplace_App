import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { map } from 'lodash';
import ScreenLoading from '../../components/ScreenLoading';
import Product from '../../components/Cart/Product';
import { getProductApi } from '../../api/product';

export default function ProductList(props) {
    const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

    useEffect(() => {
        setProducts(null);
        (async () => {
            const productTemp = [];
            let totalPaymentTemp = 0;
            let totalValue = 0;
            for await (const product of cart) {
                const response = await getProductApi(product.idProduct);
                response.quantity = product.quantity
                productTemp.push(response);
                totalPaymentTemp += (response.price - (response.price * response.discount)/100) * response.quantity;
                totalValue = (totalPaymentTemp).toFixed(2)
            }
            setProducts(productTemp);
            setTotalPayment(totalValue);
        })()
    }, [cart])

    return (
        <View>
            <Text style = {styles.title}>Carrito de compras</Text>
            {!products ? (
                <ScreenLoading text = "Cargando carrito..." size = "large" />
            ) : (
                map(products, (product) => (
                <Product 
                    key = {product._id} 
                    product = {product} 
                    setReloadCart = {setReloadCart} />
                ))
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 5
    }
});
