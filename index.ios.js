/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var ProductInStock = React.createClass({
  propTypes: {
    product: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      product: null,
    };
  },

  inStock() {
    var product = this.props.product;
    if(product === null) {
      return false;
    } else {
      return product.variants[0].inventory_quantity > 0;
    }
  },

  buyNow() {

  },

  render() {
    if(this.inStock()) {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={this.buyNow}
          >
          <Text style={styles.buttonText}>BUY NOW</Text>
        </TouchableHighlight>
        );
    } else {
      return <Text>No :(</Text>;
    }
  },
});

var InStockYet = React.createClass({
  getInitialState() {
    return {
      text: 'https://realer-dogs.sello.com/products/teapot.json',
      productJson: null,
    };
  },

  onCheckProductPressed() {
    var productUrl = this.state.text;
    if(this.validUrl(productUrl)) {
      this.checkIfProductIsIn(productUrl);
    }
  },

  validUrl(productUrl) {
    return !!productUrl;
  },

  checkIfProductIsIn(productUrl) {
    fetch(productUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          productJson: responseData.product,
        });
      })
      .done();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Is it in stock yet?
        </Text>
        <TextInput
           style={styles.textInput}
           autoFocus={true}
           placeholder="eg: http://myshop.com/product-handle"
           textAlign="center"
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
           clearButtonMode="always"
          />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onCheckProductPressed}
          >
          <Text style={styles.buttonText}>Is it?</Text>
        </TouchableHighlight>
        <ProductInStock product={this.state.productJson} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 24,
  },
  title: {
    fontSize: 40,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
  },
  button: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

AppRegistry.registerComponent('InStockYet', () => InStockYet);
