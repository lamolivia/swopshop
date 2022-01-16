import React, { useRef, useState } from "react";
import {
  Image,
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import colors from "../styles/colors";
import headers from "../styles/headers";
import SwopTextInput from "../components/atoms/TextInput";
import SwopButton from "../components/atoms/SwopButton";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
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
      username: "",
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
  const signUp = async ({ username, email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        updateProfile(getAuth().currentUser, { displayName: username });
        setDoc(doc(db, "users", cred.user.uid), {
          dateCreated: Timestamp.fromDate(new Date()),
          location: "Vancouver, Canada",
          products: [
            { image: require("../../assets/macbook.jpg"), id: 1 },
            { image: require("../../assets/macbook.jpg"), id: 2 },
          ],
          rating: Math.floor(Math.random() * 6),
          username,
        });
      })
      .then(() => navigation.navigate("Home"))
      .catch((err) => setFirebaseError(err));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/swoplogo.png")}
        />
        <SwopTextInput
          icon="user"
          value={formik.values.username}
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("username", text);
          }}
          placeholder="Username"
          onSubmitEditing={() => refEmail.current.focus()}
        />
        {formik.touched.username && formik.errors.username ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.username}
          </Text>
        ) : null}
        <SwopTextInput
          icon="envelope"
          value={formik.values.email}
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("email", text);
          }}
          placeholder="E-mail"
          onSubmitEditing={() => refPassword.current.focus()}
          reference={refEmail}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={[headers.p, styles.error]}>{formik.errors.email}</Text>
        ) : null}
        <SwopTextInput
          icon="lock"
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("password", text);
          }}
          onSubmitEditing={() => refConfirmPassword.current.focus()}
          placeholder="Password"
          reference={refPassword}
          value={formik.values.password}
          hidden
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.password}
          </Text>
        ) : null}
        <SwopTextInput
          icon="lock"
          onChange={(text) => {
            setFirebaseError({});
            formik.setFieldValue("confirmPassword", text);
          }}
          onSubmitEditing={formik.handleSubmit}
          placeholder="Confirm Password"
          reference={refConfirmPassword}
          value={formik.values.confirmPassword}
          hidden
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={[headers.p, styles.error]}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}
        <SwopButton
          title="Sign up"
          onPress={formik.handleSubmit}
          disabled={
            !formik.values.username ||
            !formik.values.email ||
            !formik.values.password ||
            !formik.values.confirmPassword
          }
        />
        <Text style={[headers.p, styles.error]}>
          {Object.keys(errorCodes).includes(firebaseError.code)
            ? errorCodes[firebaseError.code]
            : firebaseError.message}
        </Text>
        <View style={styles.loginContainer}>
          <Text style={[headers.p, styles.loginTxt1]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              formik.resetForm();
              navigation.navigate("Login");
            }}
          >
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
  logo: {
    width: 150,
    height: 75,
    marginVertical: 20,
    alignSelf: "center",
  },
  submit: {
    marginTop: "auto",
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  submitTxt: {
    textAlign: "center",
    color: "white",
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
