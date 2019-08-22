import React, { PureComponent } from 'react';
import css from './Results.module.css';
import PropTypes from 'prop-types';
import Track from '../../../components/Track/Track';
import searchIcon from '../../../assets/images/search-gray.svg';

export default class QueryResults extends PureComponent {

  render() {
    
    const tracks = this.props.item.results.map(id => {
      return <Track item={this.props.item.tracks[id]} key={id}/>
    });
    
    return (
      <div className={css.QueryResults}>
        <div className={css.QueryTitle}>
          <img className={css.SearchIcon} src={searchIcon} aria-hidden="true" alt=""/>
          <span className={css.QueryTitleText}>{this.props.item.query}</span>
        </div>
        <div className={css.Tracks}>
          {tracks}
        </div>
      </div>

    )
  }
}

QueryResults.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
    success: PropTypes.bool,
    error: PropTypes.bool,
    results: PropTypes.arrayOf(
      PropTypes.string
    ),
    tracks: PropTypes.object
  })
};