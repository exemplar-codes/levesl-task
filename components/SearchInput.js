import React from "react";
import PropTypes from "prop-types";

import { View, Image, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function SearchInput({ searchText, onChangeText }) {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/images/Search.svg")}
        width={20}
        height={20}
        alt="searchIcon"
        onError={console.log}
      /> */}
      <TextInput
        value={searchText}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder="Search"
        selectionColor={Colors.blue.text}
      />
    </View>
  );
}

SearchInput.propTypes = {
  styles: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  input: {
    padding: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});
