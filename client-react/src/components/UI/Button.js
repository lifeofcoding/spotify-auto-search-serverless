import React from 'react';
import PropTypes from 'prop-types';
import css from './UI.module.css';

class Button extends React.PureComponent {
  render() {
    const classes = [css.Button]
      .concat(this.props.lightTheme ? css.ButtonLight : [])
      .concat(this.props.large ? css.ButtonLarge : [])
      .concat(this.props.className);

    return (
      <button
        className={classes.join(' ')}
        onClick={this.props.click}>
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  lightTheme: false
};

Button.propTypes = {
  click: PropTypes.func,
  lightTheme: PropTypes.bool,
  large: PropTypes.bool
};

export default Button;