import React from "react";
import { SafeAreaView } from "react-native";
import CountrySearch from "@/screens/CountrySearch";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <CountrySearch />
    </SafeAreaView>
  );
}
