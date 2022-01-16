import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import headers from "../../styles/headers";

const SwopButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.submit, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[headers.p, styles.submitTxt]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submit: {
    marginTop: "auto",
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  disabled: { backgroundColor: colors.lightGray },
  submitTxt: { textAlign: "center", color: "white" },
});

export default SwopButton;
