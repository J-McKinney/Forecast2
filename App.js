import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import config from "./config.js";
import axios from "axios";
import {
  Alert,
  Animated,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import golfCourse from "./assets/golf2.png";
import golfBall from "./assets/golfBall.svg";
import { releaseChannel } from "expo-updates";

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
    platform: "",
  };

  componentDidMount() {
    this.setState({ platform: Platform.OS });
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

  // OpenWeather API
  getForeCast = (e) => {
    e.preventDefault();
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
              <View style={styles.logoContainer}>
                <Image source={golfBall} style={styles.logo} alt="Logo" />
              </View>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this.getForeCast}
              >
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
              {/* These Are The Filtered Golf Locations */}
              <View>
                {this.state.placesToGolf
                  .filter((place) => place)
                  .map((filteredPlaces) => (
                    <View key={filteredPlaces.id}>
                      <View style={{ height: "20px" }} />
                      <Text style={styles.welcome}>{filteredPlaces.name}</Text>
                      <View style={{ height: "20px" }} />
                      <Text
                        style={styles.welcome}
                        onPress={() => {
                          // Linking.openURL(
                          //   // "tel:`${filteredPlaces.display_phone}`"
                          //   `tel:${filteredPlaces.display_phone}`
                          // );
                          ///////////////////////////////////////////////////////
                          if (this.state.platform === "android" || "web") {
                            Linking.openURL(
                              `tel:${filteredPlaces.display_phone}`
                            );
                          } else {
                            `telprompt:${filteredPlaces.display_phone}`;
                          }
                        }}
                      >
                        {filteredPlaces.display_phone}
                      </Text>
                      <View style={{ height: "20px" }} />
                      <TouchableOpacity
                        onPress={() => {
                          let lat = filteredPlaces.coordinates.latitude;
                          let lon = filteredPlaces.coordinates.longitude;
                          console.log(filteredPlaces)
                          // console.log("Latitude: " + lat);
                          // console.log("Longitude: " + lon);
                          // Google https://www.google.com/maps/@33.9290976,-84.4697653,15z
                          // https://www.google.com/maps/dir//Legacy+Golf+Links+%26+Driving+Range,+1825+Windy+Hill+Rd+SE,+Smyrna,+GA+30080/@33.896404,-84.5353519,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88f5111e27082ae5:0xea14a71b0e0f5df0!2m2!1d-84.500333!2d33.896404
                          // https://www.google.com/maps/dir//Marietta+Country+Club,+1400+Marietta+Country+Club+Dr+NW,+Kennesaw,+GA+30152/@33.9665246,-84.5469463,13z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x88f53e3a2f35625f:0x92d12f6447eb223c!3e0
                          // Apple http://maps.apple.com/?ll=37.484847,-122.148386
                          // 1400 Marietta Country Club Dr
                          ///////////////////////////////////////////////////////////
                          // if (this.state.platform === "android" || "web") {
                          //   Linking.openURL(
                          //     `https://www.google.com/maps/dir//` + lat + `,` + lon
                          //   );
                          // } else {
                          //   `https://www.amazon.com`;
                          // }
                        }}
                      >
                        <Text style={styles.welcome}>
                          {filteredPlaces.location.display_address[0]}
                        </Text>
                        <Text style={styles.welcome}>
                          {filteredPlaces.location.display_address[1]}
                        </Text>
                        <Text style={styles.welcome}>
                          {filteredPlaces.location.display_address[2]}
                        </Text>
                        <View style={{ height: "20px" }} />
                      </TouchableOpacity>
                      <Text style={styles.welcome}>
                        Rating: {filteredPlaces.rating}/5
                      </Text>
                      <View style={{ height: "20px" }} />
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
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "50px",
    paddingTop: "50px",
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "50px",
    marginLeft: "25%",
    marginBottom: "20px",
    backgroundColor: "#009688",
    borderRadius: 10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  img: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  logo: {
    textAlign: "center",
    height: "200px",
    width: "200px",
    justifyContent: "center",
  },
  // @media (prefers-reduced-motion: no-preference) {
  //   .App-logo {
  //     animation: App-logo-spin infinite 20s linear;
  //   }
  // }
  // @keyframes App-logo-spin {
  //   from {
  //     transform: rotate(0deg);
  //   }
  //   to {
  //     transform: rotate(360deg);
  //   }
  // }
});
