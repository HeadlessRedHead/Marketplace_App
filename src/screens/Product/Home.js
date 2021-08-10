import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import StatusBar from '../../components/StatusBar';
import Search from '../../components/Search'
import NewProducts from '../../components/Home/NewProducts';
import Banners from '../../components/Home/Banners';
import colors from '../../styles/colors'; 

export default function Home() {
    return (
        <>
            <StatusBar backgroundColor = {colors.bgDark} barStyle = "light-content" />
            <Search />
            <ScrollView>
                <Text style = {styles.title}>Promociones</Text>
                <Banners />
                <NewProducts />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5
    }
});