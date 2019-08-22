import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './Track.module.css';
import IconButton from '../UI/IconButton';
import plusIcon from '../../assets/images/plus-white.svg';
import TrackActionButtons from '../../containers/TrackActionButtons/TrackActionButtons';

class Track extends PureComponent {

  constructor() {
    super();
    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.hideActionButtons = this.hideActionButtons.bind(this);
  }

  state = {
    showActions: false
  };

  onClickAddButton() {
    this.setState({
      showActions: true
    });
  }

  hideActionButtons() {
    this.setState({
      showActions: false
    });
  }

  render() {
    return (
      <div className={css.Track}>
        <img className={css.artwork} src={this.props.item.imageUrl} alt="Artwork" />
        <div className={css.itemDetails}>
          <div className={css.title}>
            {this.props.item.name}
            <IconButton iconUrl={plusIcon} className={css.actionButton} click={this.onClickAddButton}/>
          </div>
          <div className={css.subheading}>{this.props.item.artists.join(', ')} - {this.props.item.album}</div>
        </div>
        <TrackActionButtons className={css.TrackActionButtons} show={this.state.showActions} dismiss={this.hideActionButtons}/>
      </div>
    )
  }
}

Track.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    artists: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    album: PropTypes.string,
    imageUrl: PropTypes.string,
    saved: PropTypes.shape({
      toLibrary: PropTypes.number,
      toPlaylistUris: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
};

export default Track;