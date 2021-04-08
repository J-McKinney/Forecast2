import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import config from "./config.js";
import axios from "axios";
import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import golfCourse from "./assets/golf2.png";

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
      },
      (error) =>
        Alert.alert(
          "Please Enable Your GPS. Error Message: " +
            error.message +
            "Error Code: " +
            error.code
        ),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 100000,
      }
    );
  }

  getForeCast = (e) => {
    e.preventDefault();
    // OpenWeather API
    if (this.state.myLat !== "undefined") {
      const weatherAPI =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        this.state.myLat +
        "&lon=" +
        this.state.myLon +
        "&units=imperial&exclude=minutely,alerts&appid=" +
        config.WEATHER_KEY;
      axios
        .get(weatherAPI)
        .then((res) => {
          this.setState({
            temp: res.data.current.temp,
            humidity: res.data.current.humidity,
            weatherDescription: res.data.current.weather[0].description,
            windSpeed: res.data.current.wind_speed,
          });
          return axios.get(weatherAPI);
        })
        .catch((err) => {
          console.log(err);
        });
      // Reverse Geocoding API
      const reverseGeocoding =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        this.state.myLat +
        "," +
        this.state.myLon +
        "&key=" +
        config.GOOGLE_KEY;
      axios
        .get(reverseGeocoding)
        .then((res) => {
          this.setState({
            city: res.data.results[0].address_components[2].long_name,
            state: res.data.results[0].address_components[4].short_name,
            zip: res.data.results[0].address_components[6].long_name,
          });
          return axios.get(reverseGeocoding);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Something Went Wrong?");
    }
    const yelpAPI = axios.get(
      // `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
      `${"https://cors.bridged.cc/"}https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${config.YELP_KEY}`,
        },
        params: {
          term: "golf",
          categories: "golf",
          limit: 50,
          radius: 40000,
          sort_by: "distance",
          // open_now: true,
          latitude: this.state.myLat,
          longitude: this.state.myLon,
        },
      }
    );
    return yelpAPI
      .then((res) => {
        this.setState({ placesToGolf: res.data.businesses });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <ImageBackground
              source={golfCourse}
              style={styles.img}
              imageStyle={{ resizeMode: "repeat" }}
            >
              <TouchableOpacity onPress={this.getForeCast}>
                <Text style={styles.welcome}>Fore-Cast</Text>
              </TouchableOpacity>
              <Text style={styles.welcome}>
                Temp: {this.state.temp} Fehrenheit
              </Text>
              <Text style={styles.welcome}>
                Humidity: {this.state.humidity}%
              </Text>
              <Text style={styles.welcome}>
                Wind Speed: {this.state.windSpeed}/mph
              </Text>
              <Text style={styles.welcome}>
                Forecast: {this.state.weatherDescription}
              </Text>
              <Text style={styles.welcome}>
                Your Location:
                {" " +
                  this.state.city +
                  " " +
                  this.state.state +
                  " " +
                  this.state.zip}
              </Text>
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              />
              <Text style={styles.welcome}>Golf Results Closest To You:</Text>
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              />
              <View>
                {this.state.placesToGolf
                  .filter((place) => place)
                  .map((filteredPlaces) => (
                    <View key={filteredPlaces.id}>
                      <Text style={styles.welcome}>{filteredPlaces.name}</Text>
                      <Text
                        style={styles.welcome}
                        onPress={() => {
                          Linking.openURL(
                            "tel:`${filteredPlaces.display_phone}`"
                          );
                        }}
                      >
                        {filteredPlaces.display_phone}
                      </Text>
                      <Text style={styles.welcome}>
                        {filteredPlaces.location.display_address[0]}
                      </Text>
                      <Text style={styles.welcome}>
                        {filteredPlaces.location.display_address[1]}
                      </Text>
                      <Text style={styles.welcome}>
                        {filteredPlaces.location.display_address[2]}
                      </Text>
                      <Text style={styles.welcome}>
                        Rating: {filteredPlaces.rating}/5
                      </Text>
                      <View
                        style={{
                          width: "100%",
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      />
                    </View>
                  ))}
              </View>
              <StatusBar style="auto" />
            </ImageBackground>
          </View>
        </SafeAreaView>
      </>
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
    justifyContent: "center",
  },
  img: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});
