/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {AppRegistry, Component, Navigator, StyleSheet, Text, View} from 'react-native';

class NewProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      daily: "Loading daily",
      short: "Loading short"
    };
  }

  componentWillMount() {
    var API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=1&appid=';
    var API_KEY = "a5a2fb437e276743b93c889531d5eedf";
    var REQUEST_URL = API_URL + API_KEY;

    fetch(REQUEST_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.list[0].rain);
        if (data.list[0].rain > 0.2) {
          this.setState({ daily: "Pack yo' brolly!" })
        }
        else {
          this.setState({ daily: "You're all set, sunshine!" })
        }
      })
      .then((data) => {
        this.setState({ data })
      })
      .catch((reason) => { throw reason; })
  }

  render() {
    let state = this.state;
    return (
      <View style={[styles.container, styles.blue]}>
        <Navigator
          initialRoute={{name: 'My First Scene', index: 0}}
          renderScene={(route, navigator) =>
            <Text
              name={route.name}
              onForward={() => {
                var nextIndex = route.index + 1;
                navigator.push({
                  name: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          }
        />
      </View>
    );
  }

  renderScene1() {
    return (
      <View style={[styles.container, styles.green]}>
        <Text style={styles.welcome}>
          { this.state.daily }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: '900',
  },
  blue: {
    backgroundColor: '#54C7FC'
  },
  green: {
    backgroundColor: '#44DB5E'
  },
});

AppRegistry.registerComponent('NewProject', () => NewProject);
