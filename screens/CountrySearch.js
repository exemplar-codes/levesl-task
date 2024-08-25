import React, { useState, useCallback, useEffect } from "react";
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
import { Colors } from "@/constants/Colors";

export default function CountrySearch() {
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isEmpty = !data.length;

  const getCountries = useCallback(
    getDebounced(async (text) => {
      try {
        const resp = await fetch(
          `https://restcountries.com/v3.1/name/${text.trim()}`
        ); // trim needed since API behaves differently based on whitespace at ends
        if (resp.ok) {
          const data = await resp.json();
          // if search term is empty now (i.e. was not empty at API call start), clear the list.
          // otherwise set data as usual
          setSearchText((latestSearchText) => {
            if (!latestSearchText.trim()) {
              setData([]);
            } else {
              setData(data);
            }
            return latestSearchText;
          });

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

    if (!text.trim()) {
      setData([]);
      setError(null);
      return;
    }

    // optimization: avoid API calls for whitespace change
    if (text.trim() !== searchText.trim()) {
      setIsFetching(true);
      getCountries(text);
    }
  };

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
          {isEmpty && searchText ? (
            <Text style={styles.empty}>No country found!</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.cca2}
              renderItem={({ item }) => <CountryRow country={item} />}
              style={styles.list}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
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
