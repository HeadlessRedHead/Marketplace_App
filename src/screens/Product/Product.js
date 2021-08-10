import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import StatusBar from '../../components/StatusBar';
import Search from '../../components/Search';
import ScreenLoading from '../../components/ScreenLoading';
import CarouselImage from '../../components/Product/CarouselImage';
import Price from '../../components/Product/Price';
import Quantity from '../../components/Product/Quantity';
import Buy from '../../components/Product/Buy';
import Favorite from '../../components/Product/Favorite';
import { getProductApi } from '../../api/product';
import { API_URL } from '../../utils/constants';
import colors from '../../styles/colors';

export default function Product(props) {
    const { route } = props;
    const { params } = route;
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        setProduct(null);
        (async () => {
            const response = await getProductApi(params.idProduct);
            setProduct(response);
            const arrayImages = [response.main_image];
            arrayImages.push(...response.images);
            setImages(arrayImages);
        })()
    }, [params])

    return (
        <>
            <StatusBar backgroundColor = {colors.bgDark} barStyle = {"light-content"} />
            <Search />
            {!product ? (
                <ScreenLoading text = "Cargando producto..." size = "large" />
            ) : (
                <ScrollView style = {styles.container}>
                    <View style = {styles.containerInfo}>
                        <View style = {styles.containerProductImage}>
                            <Image 
                                style = {styles.image}
                                source = {{uri: `${API_URL}${product.main_image.url}`}} />
                        </View>
                        <View style = {styles.containerProductData}>
                            <Text style = {styles.title}>{product.title}</Text>
                            <Price price = {product.price} discount = {product.discount} />
                        </View>
                    </View>
                    <View style = {styles.containerView}>
                        <Quantity quantity = {quantity} setQuantity = {setQuantity} />
                        <Buy product = {product} quantity = {quantity} />
                        <Favorite product = {product} />
                    </View>
                    <Text style = {styles.title}>Galería de imágenes</Text>
                    <CarouselImage images = {images} />
                </ScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    }, title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
    }, containerProductImage: {
        width: "40%",
        padding: 2
    }, containerProductData: {
        width: "60%",
        padding: 2
    }, image: {
        height: 150,
        resizeMode: "contain"
    }, containerInfo: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    }, containerView: {
        padding: 10
    }
});
