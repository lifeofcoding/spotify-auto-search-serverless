import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './Results.module.css';
import TitleBar from '../../../components/TitleBar/TitleBar';
import Container from '../../../components/UI/Container';
import InfoBanner from '../../InfoBanner/InfoBanner';
import QueryResults from './QueryResults';
import { savedState } from '../../../stores/eums/savedState';

class Results extends Component {

  title = 'Track';
  backPath = '/';
  helpText = 'Tap + to save a result to your library or a playlist';

  // temp
  items = [
    {
      query: 'search query that is very long and spans over two lines',
      success: true,
      error: null,
      id: '1234',
      results: [
        '6nek1Nin9q48AVZcWs9e9D',
        '6nek1Nin9q48AVZcWs9e9E',
        '6nek1Nin9q48AVZcWs9e9F'
      ],
      tracks: {
        '6nek1Nin9q48AVZcWs9e9D': {
          name: 'Paradise',
          artists: ['Coldplay'],
          durationMillis: 278719,
          album: 'Mylo Xyloto',
          imageUrl: 'https://i.scdn.co/image/e7a649b3890dc849e0f1597d6d12b4342e03ce5f',
          uri: 'spotify:track:6nek1Nin9q48AVZcWs9e9D',
          id: '6nek1Nin9q48AVZcWs9e9D',
          saved: {
            toLibrary: savedState.false,
            toPlaylistUris: []
          }
        },
        '6nek1Nin9q48AVZcWs9e9E': {
          name: 'Paradise',
          artists: ['Coldplay'],
          durationMillis: 278719,
          album: 'Mylo Xyloto',
          imageUrl: 'https://i.scdn.co/image/e7a649b3890dc849e0f1597d6d12b4342e03ce5f',
          uri: 'spotify:track:6nek1Nin9q48AVZcWs9e9D',
          id: '6nek1Nin9q48AVZcWs9e9E',
          saved: {
            toLibrary: savedState.false,
            toPlaylistUris: []
          }
        },
        '6nek1Nin9q48AVZcWs9e9F': {
          name: 'Paradise',
          artists: ['Coldplay'],
          durationMillis: 278719,
          album: 'Mylo Xyloto',
          imageUrl: 'https://i.scdn.co/image/e7a649b3890dc849e0f1597d6d12b4342e03ce5f',
          uri: 'spotify:track:6nek1Nin9q48AVZcWs9e9D',
          id: '6nek1Nin9q48AVZcWs9e9F',
          saved: {
            toLibrary: savedState.false,
            toPlaylistUris: []
          }
        }
      }
    }
  ];

  render() {
    // if (!this.props.inProgress && !this.props.complete) {
    //   return null;
    // }

    const results = this.items.map(item => {
      return <QueryResults item={item} key={item.id}/>;
    });

    return (
      <Fragment>
        <TitleBar title={this.title} backPath={this.backPath} />
        <InfoBanner text={this.helpText} />
        <Container className={css.Container}>
          {results}
        </Container>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.searchResult
  }
}

export default connect(mapStateToProps)(Results);