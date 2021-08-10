import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { deleteAddressApi } from '../../api/address';
import useAuth from '../../hooks/useAuth';
import colors from '../../styles/colors';

export default function AddressList(props) {
    const { addresses, setReloadAddresses } = props;
    const { auth } = useAuth();
    const navigation = useNavigation();

    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminando dirección",
            `¿Seguro que deseas eliminar la dirección ${address.title}?`,
            [
                {
                    text: "NO"
                }, {
                    text: "SI",
                    onPress: () => deleteAddress(address._id)
                }
            ],{ cancelable: false }
        );
    };
    
    const deleteAddress = async(idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress);
            setReloadAddresses(true);
        } catch (error) {
            console.log(error);
        }
    }

    const goToUpdateAddress = (idAddress) => {
        navigation.navigate("add-address", { idAddress });
    }

    return (
        <View style = {styles.container}>
            {map(addresses, (address) => (
                <View key = {address._id} style = {styles.address}>
                    <Text style = {styles.title}>{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <Text>{address.address}</Text>
                    <Text>Número de teléfono: {address.phone}</Text>
                    <Text>Código postal: {address.postal_code}</Text>
                    <Text>{address.city}, {address.state}, {address.country}</Text>
                    <View style = {styles.actions}>
                        <Button 
                            mode = "contained" 
                            color = {colors.success}
                            onPress = {() => goToUpdateAddress(address._id)}>Editar</Button>
                        <Button 
                            mode = "contained" 
                            color = {colors.danger}
                            onPress = {() => deleteAddressAlert(address)}>Eliminar</Button>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15
    }, title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5
    }, actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    }
});