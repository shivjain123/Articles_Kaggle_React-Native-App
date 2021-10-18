import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {}
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticle = () => {
    const url = "https://88db-122-175-229-148.ngrok.io/all-articles";
    axios
      .get(url)
      .then(response => {
        let details = response.data.data;
        this.setState({ articlesDetails: details });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  likedArticles = () => {
    const url = "http://localhost:5000/liked-articles";
    axios
      .post(url)
      .then(response => {
        this.getArticles();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  unlikedArticles = () => {
    const url = "http://localhost:5000/disliked-articles";
    axios
      .post(url)
      .then(response => {
        this.getArticles();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { articlesDetails } = this.state;
    if (articlesDetails) {
      const {
        title,
        totalEvents,
        text,
      } = articlesDetails;

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              centerComponent={{
                text: "Articles",
                style: styles.headerTitle
              }}
              rightComponent={{
                icon: "article-open",
                color: "#fff",
                type: "material-community",
                onPress: () =>
                  this.props.navigation.navigate("RecommendedArticle")
              }}
              backgroundColor={"#d500f9"}
              containerStyle={{ flex: 1 }}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.subBottomContainer}>
              <View style={styles.upperBottomContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.middleBottomContainer}>
                <View style={{ flex: 0.7, padding: 15 }}>
                  <Text style={styles.overview}>{text}</Text>
                </View>
                <View style={{ flex: 0.7, padding: 15 }}>
                  <Text style={styles.events}>{totalEvents}</Text>
                </View>
              </View>
              <View style={styles.lowerBottomContainer}>
                <View style={styles.iconButtonContainer}>
                  <TouchableOpacity onPress={this.likedMovie}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.unlikedMovie}>
                    <Icon
                      reverse
                      name={"cross"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#ff1744"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18)
  },
  subContainer: {
    flex: 0.9
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  subBottomContainer: {
    flex: 0.6
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center"
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300"
  },
  middleBottomContainer: {
    flex: 0.35
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray"
  },
  events: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray"
  },
  lowerBottomContainer: {
    flex: 0.45
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15)
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold"
  }
});
