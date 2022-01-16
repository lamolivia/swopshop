import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import headers from "../../styles/headers";

const SwopTextInput = ({
  icon,
  value,
  onChange,
  placeholder,
  hidden,
  onSubmitEditing,
  reference,
}) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name={icon} solid size={22} style={styles.icon} />
      <TextInput
        style={[headers.p, styles.input]}
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        placeholder={placeholder}
        placeholderTextColor={colors.darkGray}
        returnKeyType="next"
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        ref={reference}
        secureTextEntry={hidden}
        value={value}
      />
    </View>
  );
};

export default SwopTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    marginVertical: 10,
  },
  icon: {
    marginLeft: 20,
    marginRight: 10,
    color: colors.darkGray,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingVertical: 10,
  },
});
