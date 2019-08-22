import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import css from './UI.module.css';
import TextAreaAutosize from 'react-autosize-textarea';

export default class TextArea extends PureComponent {
  componentDidMount() {
    this.textarea.focus();
  }

  render() {
    return (
      <TextAreaAutosize
        className={css.TextArea}
        rows={5}
        value={this.props.currentValue}
        onChange={this.props.change}
        innerRef={ref => this.textarea = ref}
        placeholder={this.props.placeholderText}
      />
    )
  }
}

TextArea.propTypes = {
  change: PropTypes.func,
  currentValue: PropTypes.string
};