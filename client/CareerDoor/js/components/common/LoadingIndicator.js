import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  Animated,
  ActivityIndicator,
  View
} from 'react-native';


const defaultColors =
  Platform.OS === 'ios'
    ? {
      blue: '#007aff',
      gray: '#d8d8d8',
      green: '#4cd964',
      red: '#ff3b30',
      white: '#ffffff',
      black: '#000000'
    }
    : {
      blue: '#4285f4',
      gray: '#d8d8d8',
      green: '#0f9d58',
      red: '#db4437',
      white: '#ffffff',
      black: '#000000'
    };


export default class extends Component {

  static defaultProps = {
    backgroundColor: defaultColors.white,
    foregroundColor: defaultColors.blue,
    textColor: defaultColors.black
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDataChanged) {
      this.showLoadMore()
    }
  }

  reset = () => {
    this.width.setValue(0)
    this.loaderOpacity.setValue(1)
    this.loadMoreWrapperOpacity.setValue(0)
    this.loadMoreTextOpacity.setValue(0)
  }

  showLoadMore = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.loaderOpacity, { toValue: 0, duration: 600 }),
        Animated.timing(this.width, { toValue: 100, duration: 600 }),
        Animated.timing(this.loadMoreWrapperOpacity, { toValue: 1, duration: 600 }),
      ]),
      Animated.timing(this.loadMoreTextOpacity, { toValue: 1, duration: 2 })
    ]).start();
  }

  _onLoadMoreClick = () => {
    this.reset()
    if (this.props.onLoadMoreClick) {
      this.props.onLoadMoreClick()
    } else {
      console.error('Seems no callback is provided')
    }
  }

  width = new Animated.Value(0)
  loaderOpacity = new Animated.Value(1)
  loadMoreWrapperOpacity = new Animated.Value(0)
  loadMoreTextOpacity = new Animated.Value(0)

  render() {
    const {
      backgroundColor,
      foregroundColor,
      textColor
    } = this.props;

    if (this.props.isLoading || this.props.isDataChanged) {
      return (
        <View style={[styles.loadContainer, this.props.style]}>
          <Animated.View style={[styles.mLoaderView, { opacity: this.loaderOpacity, borderColor:foregroundColor, backgroundColor }]}>
            <ActivityIndicator color={foregroundColor}  />
          </Animated.View>

          <Animated.View style={[styles.mLoaderView, styles.mLoadMoreView, { opacity: this.loadMoreWrapperOpacity, width: this.width, borderColor:foregroundColor, backgroundColor }]}>
            <Animated.Text style={[styles.mLoadMoreText, { opacity: this.loadMoreTextOpacity, color:textColor }]} onPress={this._onLoadMoreClick}>
          Load More
            </Animated.Text>
          </Animated.View>
        </View>
      )
    } else {
      return (<View />)
    }
  }
}


const styles = {
  loadContainer: {
    position: 'absolute',
    top: 60,
    left: (Dimensions.get('window').width / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },

  mLoaderView: {
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    padding:4,
    justifyContent: 'center',
  },
  mLoadMoreView: {
    height:35,
  },
  mLoadMoreText:{
    fontSize: 12,
    textAlign: 'center',
  }
}
