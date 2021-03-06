import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import config from "./config.js";
import axios from "axios";
import {
  Alert,
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
import { Card, Rating } from "react-native-elements";
import golfCourse from "./assets/golf2.png";
import golfBall from "./assets/golfBall.svg";

export default class App extends Component {
  state = {
    myLat: "",
    myLon: "",
    city: "",
    state: "",
    zip: "",
    weatherDescription: "",
    futureWeather: "",
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

  componentDidUpdate() {}

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
            temp: res.data.current.temp + "° Fehrenheit",
            humidity: res.data.current.humidity + "%",
            weatherDescription:
              res.data.current.weather[0].description.toUpperCase(),
            windSpeed: res.data.current.wind_speed + "/mph",
            futureWeather:
              res.data.daily[0].weather[0].description.toUpperCase(),
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
        "&key=AIzaSyCANJ80ZERHp5HlMHbV1la0mQ5l7_a7DaI";
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
      `${"https://corsanywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
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
          <StatusBar style="auto" />
          <View style={styles.container}>
            <ImageBackground
              source={golfCourse}
              style={styles.backgroungImg}
              imageStyle={{ resizeMode: "repeat" }}
            >
              <View style={styles.logoContainer}>
                <Image source={golfBall} style={styles.logo} alt="Logo" />
              </View>
              <TouchableOpacity
                style={styles.touchableOpacityButton}
                onPress={this.getForeCast}
              >
                <Text style={styles.forecastButton}>Fore-Cast</Text>
              </TouchableOpacity>
              <Text style={styles.view}>Temp: {this.state.temp}</Text>
              <Text style={styles.view}>Humidity: {this.state.humidity}</Text>
              <Text style={styles.view}>
                Wind Speed: {this.state.windSpeed}
              </Text>
              <Text style={styles.view}>
                Current Forecast: {this.state.weatherDescription}
              </Text>
              <Text style={styles.view}>
                Afternoon Forecast: {this.state.futureWeather}
              </Text>
              <Text style={styles.view}>
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
              <Text style={styles.view}>Golf Results Closest To You:</Text>
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  textAlign: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              />
              {/* These Are The Filtered Golf Locations */}
              <View style={{ borderRadius: 20 }}>
                {this.state.placesToGolf
                  .filter((place) => place)
                  .map((filteredPlaces) => (
                    <View style={{ borderRadius: 20 }} key={filteredPlaces.id}>
                      <Card style={styles.filteredCard}>
                        <Card.Title style={styles.filteredPlaces}>
                          {filteredPlaces.name}
                        </Card.Title>
                        <Text style={styles.view}>Call Location</Text>
                        <TouchableOpacity
                          onPress={() => {
                            if (this.state.platform === "android" || "web") {
                              Linking.openURL(
                                `tel:${filteredPlaces.display_phone}`
                              );
                            } else {
                              Linking.openURL(
                                `telprompt:${filteredPlaces.display_phone}`
                              );
                            }
                          }}
                          style={styles.touchableOpacityPhone}
                        >
                          <Text style={styles.welcome}>
                            {filteredPlaces.display_phone}
                          </Text>
                        </TouchableOpacity>
                        <View style={{ height: "20px" }} />
                        <Text style={styles.view}>Get Directions</Text>
                        <TouchableOpacity
                          style={styles.touchableOpacityCard}
                          onPress={() => {
                            let address =
                              filteredPlaces.location.display_address[0];
                            let district =
                              filteredPlaces.location.display_address[1];
                            if (this.state.platform === "android" || "web") {
                              Linking.openURL(
                                `https://www.google.com/maps/dir/` +
                                  this.state.myLat +
                                  `,` +
                                  this.state.myLon +
                                  `/` +
                                  address +
                                  district
                              );
                            } else {
                              Linking.openURL(
                                `https://www.google.com/maps/dir/` +
                                  this.state.myLat +
                                  `,` +
                                  this.state.myLon +
                                  `/` +
                                  address +
                                  district
                              );
                            }
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
                        <View style={{ height: "20px" }} />
                        <Text style={styles.welcome}>Yelp Rating:</Text>
                        <View style={{ height: "10px" }} />
                        <Rating
                          type="star"
                          ratingCount={5}
                          showReadOnlyText={true}
                          readonly={true}
                          startingValue={filteredPlaces.rating}
                        />
                        <Text style={styles.welcome}>Number of Reviews: {filteredPlaces.review_count}</Text>
                        <View style={{ height: "20px" }} />
                      </Card>
                    </View>
                  ))}
              </View>
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
  touchableOpacityCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "auto",
    marginLeft: "10%",
    paddingTop: "10px",
    backgroundColor: "#009688",
    borderRadius: 10,
  },
  touchableOpacityPhone: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "auto",
    marginLeft: "10%",
    paddingBottom: "8px",
    backgroundColor: "#009688",
    borderRadius: 10,
  },
  touchableOpacityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "50px",
    marginLeft: "25%",
    marginBottom: "20px",
    backgroundColor: "#009688",
    borderRadius: 10,
    // shadowOffset: "100",
    // shadowColor: "black",
    // shadowRadius: "50%",
    // shadowOpacity: "1",
  },
  forecastButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  filteredPlaces: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  view: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingBottom: "10px",
  },
  filteredCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  backgroungImg: {
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
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
});
