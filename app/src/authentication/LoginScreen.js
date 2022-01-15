import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import colors from "../styles/colors";
import headers from "../styles/headers";

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
        <View style={styles.bottomCont}>
          <Text style={[headers.h1, styles.h1]}>Welcome Back</Text>
          <KeyboardAvoidingView style={styles.textInputCont}>
            <Ionicons name="ios-mail" size={24} style={styles.textInputIcon} />
            <TextInput
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              placeholder="E-mail"
              placeholderTextColor={colors.darkGray}
              keyboardType="email-address"
              returnKeyType="next"
              value={formik.values.email}
              onChangeText={(text) => {
                setFirebaseError({});
                formik.setFieldValue("email", text);
              }}
              onSubmitEditing={() => refPassword.current.focus()}
              style={[headers.p, styles.input]}
            />
          </KeyboardAvoidingView>
          {formik.touched.email && formik.errors.email ? (
            <Text style={[headers.p, styles.error]}>{formik.errors.email}</Text>
          ) : null}
          <KeyboardAvoidingView style={styles.textInputCont}>
            <Ionicons
              name="ios-lock-closed"
              size={24}
              style={styles.textInputIcon}
            />
            <TextInput
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              placeholder="Password"
              placeholderTextColor={colors.darkGray}
              secureTextEntry
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onSubmitEditing={formik.handleSubmit}
              ref={refPassword}
              style={[headers.p, styles.input]}
            />
          </KeyboardAvoidingView>
          {formik.touched.password && formik.errors.password ? (
            <Text style={[headers.p, styles.error]}>
              {formik.errors.password}
            </Text>
          ) : null}
          <TouchableOpacity
            style={[
              styles.submit,
              !formik.values.email || !formik.values.password
                ? { backgroundColor: colors.lightGray }
                : null,
            ]}
            onPress={formik.handleSubmit}
            disabled={!formik.values.email || !formik.values.password}
          >
            <Text style={[headers.p, styles.submitTxt]}>Login</Text>
          </TouchableOpacity>
          <Text style={[headers.p, styles.error]}>
            {Object.keys(errorCodes).includes(firebaseError.code)
              ? errorCodes[firebaseError.code]
              : firebaseError.message}
          </Text>
          <View style={styles.split}>
            <View style={styles.bar} />
            <Text style={[headers.p, styles.barText]}> or Login with </Text>
            <View style={styles.bar} />
          </View>
          <View style={styles.loginContainer}>
            <Text style={[headers.p, styles.loginTxt1]}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={[headers.p, styles.loginTxt2]}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.lightGray,
  },
  image: { width: "100%" },
  bottomCont: {
    minHeight: 450,
    height: "60%",
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "white",
  },
  h1: { marginTop: 20, marginBottom: 10 },
  textInputCont: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    marginVertical: 10,
  },
  textInputIcon: {
    paddingHorizontal: 10,
    color: colors.darkGray,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingVertical: 10,
  },
  submit: {
    marginTop: "auto",
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  submitTxt: {
    textAlign: "center",
    color: "white",
  },
  split: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: { flex: 1, borderBottomWidth: 1.5, borderBottomColor: colors.lightGray },
  barText: { marginHorizontal: 5, color: colors.lightGray, fontSize: 15 },
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
