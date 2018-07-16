import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from "react-native";
import data from "./data/json";
import HTML from 'react-native-render-html'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true
    };
  }

  componentDidMount() {
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this._refreshing}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={myStyle.container}>
            <Image source={{ uri: item.image.value }} style={myStyle.image} />
            <FlatList
              style={myStyle.item}
              data={Object.values(item.info)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                // <Text style={myStyle.text}>
                //   {item.name}: {item.value}
                // </Text>
                <HTML html={`${item.prepend} ${item.name}: ${item.value} ${item.append}`}/>
              )}
            />
          </View>
        )}
      />
    );
  }

  _refreshing = () => {
    //this.setState({ refreshing: false });
  };
}

const myStyle = StyleSheet.create({
  container: {
    borderColor: "#000",
    margin: 10,
    borderWidth: 1,
    flexDirection: "row"
  },
  image: { marginVertical: 5, width: 150, height: 150 },
  item:{ margin: 5, flexDirection: "column" },
  text: {
    color: "#808080",
    fontSize: 16,
    marginBottom: 5
  }
});
