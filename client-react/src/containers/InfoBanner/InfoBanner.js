import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './InfoBanner.module.css';
import IconButton from '../../components/UI/IconButton';
import closeButton from '../../assets/images/close-white.svg';
import Container from '../../components/UI/Container';

export default class InfoBanner extends PureComponent {

  constructor() {
    super();
    this.dismiss = this.dismiss.bind(this);
  }

  state = {
    dismissed: false
  };

  dismiss() {
    console.log('state');
    this.setState({
      dismissed: true
    });

    if (this.props.dismiss) {
      this.props.dismiss();
    }
  }

  render() {

    const style = {};
    if (this.state.dismissed) {
      style.maxHeight = '0px';
    }

    return (
      <div className={css.InfoBanner} style={style}>
        <Container className={css.Container}>
          <div className={css.Text}>{this.props.text}</div>
          <IconButton
            iconUrl={closeButton}
            click={this.dismiss}
            className={css.DismissBtn}
            width="12px"
            height="12px"
          />
        </Container>
      </div>
    )
  }
}

InfoBanner.propTypes = {
  text: PropTypes.string.isRequired,
  dismiss: PropTypes.func
};