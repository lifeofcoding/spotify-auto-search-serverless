import React, { Component } from 'react';
import Button from '../../components/UI/Button';
import TextArea from '../../components/UI/TextArea';
import css from './BatchSearch.module.css';
import { connect } from 'react-redux';
import { spotifyDoSearch } from '../../stores/actions/spotifyActions';
import { withRouter } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import Container from '../../components/UI/Container';

class BatchSearch extends Component {

  state = {
    inputText: ''
  };

  placeholderText = 'Type or paste one search query per line\nAnd tap search to begin';

  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }

  onChangeSearchText(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  search() {
    if (this.state.inputText.trim().length > 0) {
      const queries = this.state.inputText.split('\n').filter(x => x.length > 0);
      if (queries.length > 0) {
        this.props.spotifyDoSearch(queries);
        this.props.history.push('/results');
      }
    }
  };

  render() {
    return (
      <div>
        <TitleBar title="Spotify Batch Search" backPath="/"/>
        <Container className={css.Container}>
          <div className={css.SearchInput}>
            <TextArea
              placeholderText={this.placeholderText}
              change={this.onChangeSearchText}
              currentValue={this.state.inputText}
            />
          </div>

          <Button
            lightTheme
            click={this.search}
          >Search
          </Button>
        </Container>

      </div>
    )
  }
}

const mapDispatchToProps = {
  spotifyDoSearch
};

export default connect(null, mapDispatchToProps)(withRouter(BatchSearch));