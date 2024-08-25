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

export default function CountrySearchOneShotData() {
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isEmpty = !data.length;

  const getCountries = async (text) => {
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(text)}`
      ); // trim needed since API behaves differently based on whitespace at ends
      if (resp.ok) {
        const data = await resp.json();
        setData(data);
        setFilteredData(data);
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

  const filterCountries = (text) => {
    setFilteredData(
      data.filter(
        (country) => !text.trim() || country.name.common.startsWith(text.trim())
      )
    ); // filter or match-all (blank text)
  };

  const onChangeTextHandler = (text) => {
    setSearchText(text);

    // optimization: avoid filtering for for whitespace change
    if (text.trim() === searchText.trim()) return;

    filterCountries(text);
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
              data={filteredData}
              keyExtractor={(item) => item.cca2}
              renderItem={({ item }) => <CountryRow country={item} />}
              extraData={searchText.trim()}
              style={styles.list}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </>
      )}
    </View>
  );
}

CountrySearchOneShotData.propTypes = {
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
