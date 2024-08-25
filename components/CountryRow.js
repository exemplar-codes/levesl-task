import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function CountryRow({ country }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: country?.flags?.png, height: 40, width: 40 }} />
      <View>
        <Text style={styles.name}>{country?.name?.common} </Text>
        <Text style={styles.capital}>{country?.capital?.join(", ")}</Text>
      </View>
      <Text style={styles.currencies}>
        {Object.keys(country?.currencies ?? {}).join(", ")}
      </Text>
    </View>
  );
}

CountryRow.propTypes = {
  styles: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  capital: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.blue.text,
    fontStyle: "italic",
  },
  currencies: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.text,
    marginLeft: "auto",
  },
});
