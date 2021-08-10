import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import StatusBar from '../components/StatusBar';
import Search from '../components/Search';
import ScreenLoading from '../components/ScreenLoading';
import FavoriteList from '../components/Favorites/FavoriteList';
import { getFavorites } from '../api/favorite';
import useAuth from '../hooks/useAuth'
import colors from '../styles/colors';

export default function Favorites() {
    const [products, setProducts] = useState(null);
    const [reloadFavorites, setReloadFavorites] = useState(false)
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setProducts(null);
            (async () => {
                const response = await getFavorites(auth);
                setProducts(response);
            })();
            setReloadFavorites(false);
        }, [reloadFavorites])
    );

    return (
        <>
            <StatusBar backgroundColor = {colors.bgDark} barStyle = 'light-content' />
            <Search />
            {!products ? (
                <ScreenLoading text = "Cargando mis favoritos" size = "large" />
            ) : size(products) === 0 ? (
                <View style = {styles.container}>
                    <Text style = {styles.title}>Lista de favoritos</Text>
                    <Text style = {styles.otherText}>No tienes productos en tu lista</Text>
                </View>
            ) : (
                <FavoriteList products = {products} setReloadFavorites = {setReloadFavorites} />
            )}
        </>
    );
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
        fontSize: 14,
        padding: 5
    }
});