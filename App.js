import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { GKey, WKey, YClientID, YKey } from "react-native-dotenv";
// import axios from "axios";
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
require("dotenv").config();

export default class App extends Component {
  state = {
    // location: null,
    // location: [],
    myLat: "",
    myLon: "",
    city: "",
    state: "",
    zip: "",
    weatherDescription: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    placesToGolf: [],
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        this.setState({ myLat: coordinates.latitude });
        this.setState({ myLon: coordinates.longitude });
        // const location = JSON.stringify(pos);
        // this.setState({ location });
      },
      (error) => Alert.alert(error.message, error.code),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
    console.log(this.state.myLat);
    console.log(this.state.myLon);
  }

  findCoordinates = () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const location = JSON.stringify(position);
    //     this.setState({ location });
    //   },
    //   (error) => Alert.alert(error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    // console.log(this.state.location);
  };

  getForeCast = (e) => {
    e.preventDefault();
    console.log("Hello");
    console.log(YClientID, YKey, WKey, GKey);
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.getForeCast}>
            <Text style={styles.welcome}>Find My Coords?</Text>
            {/* <Text style={styles.welcome}>Location: {this.state.location}</Text> */}
            <Text style={styles.welcome}>Latitude: {this.state.myLat}</Text>
            <Text style={styles.welcome}>Longitude: {this.state.myLon}</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
