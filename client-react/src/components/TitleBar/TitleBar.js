import React, { PureComponent } from 'react';
import css from './TitleBar.module.css';
import { Link } from 'react-router-dom';
import leftChevronWhite from '../../assets/images/left-chevron-white.svg';
import PropTypes from 'prop-types';
import IconButton from '../UI/IconButton';

export default class TitleBar extends PureComponent {

  render() {

    let backButton = null;
    if (this.props.backPath) {
      backButton = (
        <Link to={this.props.backPath} className={css.BackButton}>
          {/*<img src={leftChevronWhite} alt="Back" />*/}
          <IconButton iconUrl={leftChevronWhite} />
        </Link>
      );
    }

    return (
      <div className={css.TitleBar}>
        {backButton}
        <div className={css.Title}>{this.props.title || ''}</div>
      </div>
    )
  }
}

TitleBar.propTypes = {
  title: PropTypes.string,
  backPath: PropTypes.string
};