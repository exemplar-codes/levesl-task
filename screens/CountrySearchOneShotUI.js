import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import CountryRow from "@/components/CountryRow";
import SearchInput from "@/components/SearchInput";

import { Colors } from "@/constants/Colors";

/**
 * One API call, then offline, uses empty slots. Slower.
 */
export default function CountrySearchOneShot() {
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isEmpty = !data.length;

  const getCountries = async (text) => {
    console.log({ text });
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(text)}`
      ); // trim needed since API behaves differently based on whitespace at ends
      if (resp.ok) {
        const data = await resp.json();
        setData(data);
        setError(null);
      } else {
        setError(resp.statusText);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsFetching(false);
    }
  };

  const onChangeTextHandler = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    getCountries(" "); // " " means all
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ margin: 16 }}>
        <SearchInput
          searchText={searchText}
          onChangeText={onChangeTextHandler}
        />
      </View>

      {isFetching ? (
        <ActivityIndicator size={60} color={Colors.blue.text} />
      ) : error ? (
        <Text style={styles.error}>{JSON.stringify(error)}</Text>
      ) : (
        <>
          {isEmpty && searchText.trim() ? (
            <Text style={styles.empty}>No such country found!</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.cca2}
              renderItem={({ item }) =>
                item.name.common.startsWith(searchText.trim()) ? (
                  // optimization: avoid filtering for for whitespace change

                  <View style={styles.separator}>
                    <CountryRow country={item} />
                  </View>
                ) : null
              }
              extraData={searchText.trim()}
              style={styles.list}
              //   ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </>
      )}
    </View>
  );
}

CountrySearchOneShot.propTypes = {
  styles: PropTypes.object,
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    paddingHorizontal: 16,
  },
  separator: {
    padding: 8,
  },
  empty: {
    margin: 16,
    marginTop: 0,
  },
  error: {
    margin: 16,
    marginTop: 0,
  },
});
