import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StatusBar from '../components/StatusBar';
import Search from '../components/Search';
import NotProducts from '../components/Cart/NotProduct';
import ProductList from '../components/Cart/ProductList';
import AddressList from '../components/Cart/AddressList';
import Payment from '../components/Cart/Payment';
import useAuth from '../hooks/useAuth';
import { getProductCartApi } from '../api/cart';
import { getAddressesApi } from '../api/address';
import colors from '../styles/colors'

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null)
    const { auth } = useAuth();

    

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            setAddresses(null);
            setSelectedAddress(null)
            loadCart();
            loadAddresses();
            setReloadCart(false);
        }, [setReloadCart])
    );

    useEffect(() => {
        if (reloadCart) {
            loadCart();
            setReloadCart(false);
        }
    }, [reloadCart]);

    const loadCart = async () => {
        const response = await getProductCartApi();
        setCart(response);
    }

    const loadAddresses = async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
    }

    return (
        <>
            <StatusBar backgroundColor = {colors.bgDark} barStyle = "light-content" />
            {!cart || size(cart) === 0 ? (
                <>
                    <Search />
                    <NotProducts />
                </>
            ) : (
                <KeyboardAwareScrollView extraScrollHeight = {25}>
                    <ScrollView style = {styles.cartContainer}>
                        <ProductList 
                            cart = {cart} 
                            products = {products} 
                            setProducts = {setProducts} 
                            setReloadCart = {setReloadCart}
                            setTotalPayment = {setTotalPayment} />
                        <AddressList 
                            addresses = {addresses} 
                            selectedAddress = {selectedAddress} 
                            setSelectedAddress = {setSelectedAddress} />
                        <Payment 
                            products = {products} 
                            selectedAddress = {selectedAddress} 
                            totalPayment = {totalPayment} />
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
        </>  
    );
}

const styles = StyleSheet.create({
    cartContainer: {
        padding: 10
    }
});