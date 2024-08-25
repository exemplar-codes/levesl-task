import React from "react";
import { SafeAreaView } from "react-native";
import CountrySearch from "@/screens/CountrySearch";
import CountrySearchOneShotUI from "@/screens/CountrySearchOneShotUI";
import CountrySearchOneShotData from "@/screens/CountrySearchOneShotData"; // task

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <CountrySearchOneShotData />
    </SafeAreaView>
  );
}
