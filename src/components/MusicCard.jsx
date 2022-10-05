import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.requestFavorite();
  }

  // função para acessar o objeto
  requestFunc = async () => {
    const { isChecked } = this.state;
    this.setState({ loading: true });
    const { save } = this.props;
    if (isChecked) {
      await removeSong(save);
      this.setState({ isChecked: false, loading: false });
    } else {
      await addSong(save);
      this.setState({ loading: false, isChecked: true });
    }
  };

  // função para salvar no localStorage
  requestFavorite = async () => {
    const resp = await getFavoriteSongs();
    const { save } = this.props;
    if (resp.some((song) => song.trackId === save.trackId)) {
      this.setState({ isChecked: true });
    }
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          { trackName }
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="check">
            Favorita
            <input
              type="checkbox"
              name="check"
              id="check"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isChecked }
              onClick={ this.requestFunc }
            />
          </label>
        </div>
      ));
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  save: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
