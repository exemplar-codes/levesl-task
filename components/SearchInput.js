import React from "react";
import PropTypes from "prop-types";

import { View, Image, TextInput, StyleSheet } from "react-native";

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
      />
    </View>
  );
}

SearchInput.propTypes = {
  styles: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "gray",
  },
  input: {
    fontSize: 14,
    fontWeight: "500",
  },
});
