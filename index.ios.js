/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Product = require('./App/Product');

var React = require('react-native');
var {
  AppRegistry,
  AlertIOS,
  Image,
  LinkingIOS,
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
      return product.inStock();
    }
  },

  buyNow() {
    LinkingIOS.openURL(this.props.product.productUrl);
  },

  render() {
    if(this.inStock()) {
      return (
        <View style={styles.buyNowBox}>
          <Text>It is!</Text>
          <Image
            source={{uri: this.props.product.product.image.src}}
            style={styles.thumbnail} />
          <TouchableHighlight
            style={styles.button}
            onPress={this.buyNow}
            >
            <Text style={styles.buttonText}>BUY NOW</Text>
          </TouchableHighlight>
        </View>
        );
    } else {
      return <Text>No :(</Text>;
    }
  },
});

var InStockYet = React.createClass({
  getInitialState() {
    return {
      productUrl: 'https://realer-dogs.sello.com/products/teapot',
      product: null,
    };
  },

  onCheckProductPressed() {
    var productUrl = this.state.productUrl;
    if(Product.isValid(productUrl)) {
      Product.get(productUrl)
        .then((product) => this.setState({product}))
        .done();
    } else {
      AlertIOS.alert('Nope', 'Invalid URL, plz try again');
    }
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
           onChangeText={(productUrl) => this.setState({productUrl})}
           value={this.state.productUrl}
           clearButtonMode="always"
          />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onCheckProductPressed}
          >
          <Text style={styles.buttonText}>Is it?</Text>
        </TouchableHighlight>
        <ProductInStock
        product={this.state.product} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  buyNowBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 24,
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
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  thumbnail: {
    height: 100,
    width: 100,
    padding: 10,
  },
});

AppRegistry.registerComponent('InStockYet', () => InStockYet);
