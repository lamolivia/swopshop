import React, { useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import * as WebBrowser from "expo-web-browser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../utils/firebase";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import colors from "../styles/colors";
import headers from "../styles/headers";

// WebBrowser.maybeCompleteAuthSession();

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const errorCodes = {
  "auth/invalid-email": "Invalid email",
};

const SignupScreen = ({ navigation }) => {
  const [firebaseError, setFirebaseError] = useState({});

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      signUp(values);
      resetForm();
    },
  });

  // Sign up with email
  const signUp = async ({ name, email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        updateProfile(getAuth().currentUser, { displayName: name });
        setDoc(doc(db, "users", cred.user.uid), {
          dateCreated: Timestamp.fromDate(new Date()),
          displayName: name,
          streak: 0,
        });
      })
      .then(() => navigation.navigate("OnboardingBirthday"))
      .catch((err) => setFirebaseError(err));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={[headers.h1, styles.h1]}>Create Account</Text>
        <View style={styles.textInputCont}>
          <Ionicons name="person" size={24} style={styles.textInputIcon} />
          <TextInput
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            placeholder="Name"
            placeholderTextColor={colors.darkGray}
            returnKeyType="next"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onSubmitEditing={() => refEmail.current.focus()}
            style={[headers.p, styles.input]}
          />
        </View>
        {formik.touched.name && formik.errors.name ? (
          <Text style={[headers.p, styles.error]}>{formik.errors.name}</Text>
        ) : null}
        <View style={styles.textInputCont}>
          <Ionicons name="ios-mail" size={24} style={styles.textInputIcon} />
          <TextInput
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            placeholder="E-mail"
            placeholderTextColor={colors.darkGray}
            keyboardType="email-address"
            returnKeyType="next"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onSubmitEditing={() => refPassword.current.focus()}
            ref={refEmail}
            style={[headers.p, styles.input]}
          />
        </View>
        {formik.touched.email && formik.errors.email ? (
          <Text style={[headers.p, styles.error]}>{formik.errors.email}</Text>
        ) : null}
        <View style={styles.textInputCont}>
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
            onSubmitEditing={() => refConfirmPassword.current.focus()}
            ref={refPassword}
            style={[headers.p, styles.input]}
          />
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.password}
          </Text>
        ) : null}
        <View style={styles.textInputCont}>
          <Ionicons
            name="ios-lock-closed"
            size={24}
            style={styles.textInputIcon}
          />
          <TextInput
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            placeholder="Confirm Password"
            placeholderTextColor={colors.darkGray}
            secureTextEntry
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            onSubmitEditing={formik.handleSubmit}
            ref={refConfirmPassword}
            style={[headers.p, styles.input]}
          />
        </View>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}
        <TouchableOpacity
          style={[
            styles.submit,
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.password ||
            !formik.values.confirmPassword
              ? { backgroundColor: colors.lightGray }
              : null,
          ]}
          disabled={
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.password ||
            !formik.values.confirmPassword
          }
          onPress={formik.handleSubmit}
        >
          <Text style={[headers.p, styles.submitTxt]}>Join Clearo</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[headers.p, styles.loginTxt2]}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
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
