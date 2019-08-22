import React from 'react';
import PropTypes from 'prop-types';
import css from './UI.module.css';

export default class IconButton extends React.PureComponent {



  render() {
    const style = {
      backgroundImage: 'url('+this.props.iconUrl+')'
    };

    if (this.props.width) style.width = this.props.width;
    if (this.props.height) style.height = this.props.height;

    return (
      <button className={css.IconButton + ' ' + (this.props.className || '')}
              onClick={this.props.click}
              style={style}
      />
    )
  }
}

IconButton.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  click: PropTypes.func
};