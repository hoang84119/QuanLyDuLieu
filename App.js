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
      <View style={{flex:1}}>
        <FlatList
          //numColumns={2}
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
      </View>
    );
  }

  _refreshing = () => {
    //this.setState({ refreshing: false });
  };
}

const myStyle = StyleSheet.create({
  container: {
    //borderColor: "#000",
    marginHorizontal: 10,
    //borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical:5,
    flex: 1
  },
  image: { marginVertical: 5, width: 125, height: 125 },
  item:{ margin: 5, flexDirection: "column" },
  text: {
    color: "#808080",
    fontSize: 14,
    marginBottom: 5
  }
});
