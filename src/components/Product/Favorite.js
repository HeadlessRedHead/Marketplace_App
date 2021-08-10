import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { size } from 'lodash';
import useAuth from '../../hooks/useAuth';
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../api/favorite';
import colors from '../../styles/colors';

export default function Favorite(props) {
    const { product } = props;
    const [isFavorite, SetIsFavorite] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product._id)
            if (size(response) === 0) SetIsFavorite(false);
            else SetIsFavorite(true);
        })()
    }, [product])

    const addFavorite = async () => {
        if (!loading){
            setLoading(true);
            try {
                await addFavoriteApi(auth, product._id);
                SetIsFavorite(true);
                Toast.show("Producto añadido a favoritos", {
                    position: Toast.positions.CENTER
                })
            } catch (error) {
                console.log(error);
                Toast.show("ERROR al añadir producto a favoritos", {
                    position: Toast.positions.CENTER
                })
            }
            setLoading(false);
        }
    };

    const deleteFavorite = async () => {
        if (!loading){
            setLoading(true);
            try {
                await deleteFavoriteApi(auth, product._id);
                SetIsFavorite(false);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    if (isFavorite === undefined) return null;

    return (
        <View style = {{zIndex: 1}}>
            <Button 
                mode = "contained" 
                contentStyle = {isFavorite ? styles.btnDeleteFavoritesContent : styles.btnAddFavoritesContent}
                labelStyle = {styles.btnLabel}
                style = {styles.btn}
                onPress = {isFavorite ? deleteFavorite : addFavorite}
                loading = {loading}>{isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"} </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnLabel: {
        fontSize: 18
    }, btnAddFavoritesContent: {
        backgroundColor: colors.success,
        paddingVertical: 5
    }, btnDeleteFavoritesContent: {
        backgroundColor: colors.danger,
        paddingVertical: 5
    }, btn: {
        marginTop: 20
    }
});
