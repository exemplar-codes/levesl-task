import React, { useState, useCallback } from "react";
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

import { getDebounced } from "@/utils/common";

export default function CountrySearch() {
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isEmpty = !data.length;

  const getCountries = useCallback(
    getDebounced(async (text) => {
      try {
        setIsFetching(true);
        const resp = await fetch(`https://restcountries.com/v3.1/name/${text}`);
        console.log("API called");
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
    }),
    []
  );

  const onChangeTextHandler = (text) => {
    setSearchText(text);
    if (text) getCountries(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput searchText={searchText} onChangeText={onChangeTextHandler} />
      {isFetching ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : (
        <>
          {isEmpty && searchText ? (
            <Text>No country found!</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.cca2}
              renderItem={({ item }) => <CountryRow country={item} />}
            />
          )}
        </>
      )}
    </View>
  );
}

CountrySearch.propTypes = {
  styles: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
});
