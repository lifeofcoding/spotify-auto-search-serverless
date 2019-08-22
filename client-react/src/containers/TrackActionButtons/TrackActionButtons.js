import React, { PureComponent } from 'react';
import css from './TrackActionButtons.module.css';
import heartIcon from '../../assets/images/heart-white.svg';
import plusIcon from '../../assets/images/plus-gray.svg';
import PropTypes from 'prop-types';

export default class TrackActionButtons extends PureComponent {

  wrapperRef = null;

  constructor() {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  state = {
    save: {
      loading: false,
      saved: false
    }
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.dismiss();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    if (!this.props.show && prevProps.show) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  onClickSave() {
    this.setState(prevState => {
      if (!prevState.save.saved) {
        return {
          save: {
            loading: true,
            saved: false
          }
        }
      } else {

      }
    });
  }

  render() {
    const classes = [css.Container];
    if (this.props.className) classes.push(this.props.className);
    if (this.props.show) classes.push(css.Visible);

    const style = {
      backgroundImage: 'url('+heartIcon+')'
    };

    return (
      <div ref={this.setWrapperRef} className={classes.join(' ')}>
        <button className={css.Save} >
          <div className={css.Icon} style={style} />
          <span className={css.Label}>Save</span>
        </button>
        <button className={css.Playlist}>
          <img className={css.Icon} src={plusIcon} alt="" />
          <span className={css.Label}>Playlist</span>
        </button>
      </div>
    )
  }
}

TrackActionButtons.propTypes = {
  show: PropTypes.bool,
  dismiss: PropTypes.func
};