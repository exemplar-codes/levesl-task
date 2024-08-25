import React from "react";
import PropTypes from "prop-types";

import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

export default function SearchInput({ searchText, onChangeText }) {
  return (
    <View style={styles.container}>
      <View tyle={styles.searchIcon}>
        <Icon name="search" size={20} />
      </View>
      <TextInput
        value={searchText}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder="Search"
        selectionColor={Colors.blue.text}
      />
      {searchText ? (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText("")}
        >
          <Icon name="clear" size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

SearchInput.propTypes = {
  styles: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  clearButton: {
    backgroundColor: "lightgray",
    borderRadius: 32,
    marginLeft: "auto",
  },
});
