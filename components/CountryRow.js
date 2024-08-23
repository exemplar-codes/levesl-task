import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function CountryRow({ country }) {
  return (
    <View style={styles.container}>
      <View>
        {/* <Image source={{ uri: country?.flags?.svg, height: 42, width: 42 }} /> */}
        <Text style={styles.name}>{country?.name?.common} </Text>
        <Text style={styles.capital}>{country?.capital?.join(", ")}</Text>
      </View>
      {/*  */}
      <Text style={{ color: "black" }}>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  capital: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(75, 78, 252, 1)",
    fontStyle: "italic",
  },
  currencies: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.text,
  },
});
