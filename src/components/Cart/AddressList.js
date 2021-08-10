import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { map } from 'lodash';
import ScreenLoading from '../ScreenLoading';
import colors from '../../styles/colors';

export default function AddressList(props) {
    const { addresses, selectedAddress, setSelectedAddress } = props;

    useEffect(() => {
        addresses && setSelectedAddress(addresses[0])
    }, [addresses])

    return (
        <View style = {styles.container}>
            <Text style = {styles.containerTitle}>Dirección de envio</Text>
            {!addresses && <ScreenLoading text = "Cargando direcciones..."/> }
            {map(addresses, (address) => (
                <TouchableWithoutFeedback key = {address._id} onPress={() => setSelectedAddress(address)}>
                    <View style = {[styles.address, address._id === selectedAddress?._id && styles.checked ]}>
                        <Text style = {styles.title}>{address.title}</Text>
                        <Text>{address.name_lastname}</Text>
                        <Text>{address.address}</Text>
                        <Text>Número de teléfono: {address.phone}</Text>
                        <Text>Código postal: {address.postal_code}</Text>
                        <Text>{address.city}, {address.state}, {address.country}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }, containerTitle:{
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: "bold"
    }, address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#C7CCD2',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#E3E5E8'
    }, title: {
        fontWeight: "bold",
        paddingBottom: 5
    }, checked: {
        borderColor: colors.primary,
        backgroundColor: '#0098d330'
    }
});