import React, { useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import colors from "../styles/colors";
import headers from "../styles/headers";
import SwopTextInput from "../components/atoms/TextInput";
import SwopButton from "../components/atoms/SwopButton";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const errorCodes = {
  "auth/wrong-password": "The password is invalid",
  "auth/user-not-found":
    "There is no existing user record corresponding to the email",
};

const LoginScreen = ({ navigation }) => {
  const [firebaseError, setFirebaseError] = useState({});

  const refPassword = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      signIn(values);
      resetForm();
    },
  });

  const signIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        setFirebaseError({});
        if (resp && resp.user) {
          navigation.navigate("Home");
        }
      })
      .catch((err) => setFirebaseError(err));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/swoplogo-removebg.png")}
        />
        <SwopTextInput
          icon="envelope"
          value={formik.values.email}
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("email", text);
          }}
          onSubmitEditing={() => refPassword.current.focus()}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={[headers.p, styles.error]}>{formik.errors.email}</Text>
        ) : null}
        <SwopTextInput
          value={formik.values.password}
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("password", text);
          }}
          onSubmitEditing={formik.handleSubmit}
          placeholder="Password"
          reference={refPassword}
          icon="lock"
          hidden
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.password}
          </Text>
        ) : null}
        <SwopButton
          title="Login"
          onPress={formik.handleSubmit}
          disabled={!formik.values.email || !formik.values.password}
        />
        <Text style={[headers.p, styles.error]}>
          {Object.keys(errorCodes).includes(firebaseError.code)
            ? errorCodes[firebaseError.code]
            : firebaseError.message}
        </Text>
        <View style={styles.loginContainer}>
          <Text style={[headers.p, styles.loginTxt1]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              formik.resetForm();
              navigation.navigate("Signup");
            }}
          >
            <Text style={[headers.p, styles.loginTxt2]}>Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
  logo: {
    width: 150,
    height: 75,
    marginVertical: 20,
    alignSelf: "center",
  },
  loginContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginTxt1: {
    fontSize: 15,
  },
  loginTxt2: {
    color: colors.primary,
    fontSize: 15,
  },
  error: {
    color: "red",
    marginLeft: 10,
    fontSize: 15,
  },
});
