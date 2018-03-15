import React, { Component } from 'react'
import {
  Dimensions,
  Animated,
  View
} from 'react-native'
import * as COLOR from '../../utils/colors'
import LottieLoader from './LottieLoader'

export default class extends Component {

  static defaultProps = {
    backgroundColor: COLOR.white,
    foregroundColor: COLOR.blue600,
    textColor: COLOR.black
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
    ]).start()
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
          <Animated.View style={[styles.lottieLoader, { opacity: this.loaderOpacity }]}>
            <LottieLoader />
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
  lottieLoader: {
    position: 'absolute',
    width:100,
    padding:4,
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
    fontFamily: 'Roboto-Regular',
  }
}
