import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
    input: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      input: target.value,
    }, () => {
      const { input } = this.state;
      const limit = 2;
      this.setState({
        isDisabled: input.length < limit });
    });
  };

  render() {
    const { isDisabled, input } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <form action="">
          <label htmlFor="name">
            <input
              type="text"
              name="input"
              id="name"
              data-testid="search-artist-input"
              placeholder="Artists, songs, or albums"
              onChange={ this.handleChange }
              value={ input }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
