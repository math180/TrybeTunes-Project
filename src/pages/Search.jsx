import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      text: '',
      loading: false,
      artist: '',
      data: [],
      showList: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      text: target.value,
    }, () => {
      const { text } = this.state;
      const limit = 2;
      this.setState({
        isDisabled: text.length < limit });
    });
  };

  handleClick = async () => {
    const { text } = this.state;
    this.setState({ loading: true });
    const list = await searchAlbumsAPI(text);
    this.setState({ loading: false, text: '', data: list, showList: true });
  };

  render() {
    const { isDisabled, text, loading, data, showList, artist } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <div data-testid="page-search">
          <Header />
          <h1>Search</h1>
          <label htmlFor="name">
            <input
              type="text"
              name="text"
              id="name"
              data-testid="search-artist-input"
              placeholder="Artists, songs, or albums"
              onChange={ this.handleChange }
              value={ text }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        { showList && (
          <h2>
            {`Resultado de álbum de: ${artist}`}
          </h2>
        ) }
        { data.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          data.map((song) => (
            <div key={ song.collectionName }>
              <img src={ song.artworkUrl100 } alt={ song.collectionName } />
              <p>{ song.collectionName }</p>
              <p>{ song.artistName }</p>
              <Link
                to={ `/album/${song.collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                Ver álbum
              </Link>
            </div>
          ))
        )}
      </>
    );
  }
}

export default Search;
