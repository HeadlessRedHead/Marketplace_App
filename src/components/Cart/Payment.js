import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { size } from 'lodash';
import useAuth from '../../hooks/useAuth';
import { STRIPE_PUBLISHABLE_KEY } from '../../utils/constants';
import { paymentCartApi, deleteCartApi } from '../../api/cart';
import { formStyles } from '../../styles';
import colors from '../../styles/colors';
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);

export default function Payment(props) {
    const { products, selectedAddress, totalPayment } = props;
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const result = await stripe.createToken({card : formData});

            if(result?.error) {
                setLoading(false);
                Toast.show(result.error.message, {
                    position: Toast.positions.CENTER
                });
            } else {
                const response = await paymentCartApi(
                    auth, result.id, products, selectedAddress
                );
                if(size(response) > 0){
                    await deleteCartApi();
                    navigation.navigate("account", { screen: "orders" });
                } else {
                    Toast,show("Error al realizar el pedido", {
                        position: Toast.positions.CENTER
                    })
                    setLoading(false);
                }
            }
        }
    });

    return (
        <View stye = {styles.container}>
            <Text style = {styles.containerTitle}>Forma de pago</Text>
            <TextInput 
                label = "Nombre de la tarjeta"
                style = {formStyles.input}
                onChangeText = {(text) => formik.setFieldValue("name", text)}
                value = {formik.values.name}
                error = {formik.errors.name} />
            <TextInput 
                label = "Número de la tarjeta"
                style = {formStyles.input}
                onChangeText = {(text) => formik.setFieldValue("number", text)}
                value = {formik.values.number}
                error = {formik.errors.number} />
            <View style = {styles.containerInput}>
                <View style = {styles.containerMonthYearInputs}>
                    <TextInput 
                        label = "Mes"
                        style = {styles.inputDate}
                        onChangeText = {(text) => formik.setFieldValue("exp_month", text)}
                        value = {formik.values.exp_month}
                        error = {formik.errors.exp_month} />
                    <TextInput 
                        label = "Año"
                        style = {styles.inputDate}
                        onChangeText = {(text) => formik.setFieldValue("exp_year", text)}
                        value = {formik.values.exp_year}
                        error = {formik.errors.exp_year} />
                </View>
                <TextInput 
                    label = "CVV/CVC"
                    style = {styles.inputCVC}
                    onChangeText = {(text) => formik.setFieldValue("cvc", text)}
                    value = {formik.values.cvc}
                    error = {formik.errors.cvc} />
            </View>
            <Button 
                mode = "contained" 
                contentStyle = {styles.btnContent} 
                labelStyle = {styles.btnText}
                onPress = {!loading && formik.handleSubmit}
                loading = {loading}>Realizar pago (US$ {totalPayment && `${totalPayment}`})</Button>
        </View>
    )
}

function initialValues() {
    return {
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        name: ""
    }
}

function validationSchema() {
    return {
        number: Yup.string().matches(/^[0-9]*$/, true).min(16, true).max(16, true).required(true),
        exp_month: Yup.string().matches(/^[0-9]*$/, true).min(1, true).max(2, true).required(true),
        exp_year: Yup.string().matches(/^[0-9]*$/, true).min(2, true).max(2, true).required(true),
        cvc: Yup.string().matches(/^[0-9]*$/, true).min(3, true).max(3, true).required(true),
        name: Yup.string().matches(/^[A-Z ]+$/, true).min(4, true).required(true),
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom:30
    }, containerTitle: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: "bold"
    }, containerInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    }, containerMonthYearInputs: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    }, inputDate: {
        width: 100,
        marginRight: 10
    }, inputCVC: {
        width: '40%',
    }, btnContent: {
        paddingVertical: 4,
        backgroundColor: colors.primary
    }, btnText: {
        fontSize: 16
    }
})