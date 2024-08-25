import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function CountryRow({ country }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: country?.flags?.png }}
        resizeMode="contain"
        style={{
          height: 40,
          width: 80,
        }}
      />
      <View style={styles.middleBox}>
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
  middleBox: {
    flex: 1, // so long name doesnt cause overflow
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
    color: "green",
    marginLeft: "auto",
  },
});
