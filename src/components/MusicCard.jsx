import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  requestFunc = async () => {
    this.setState({ loading: true });
    await addSong();
    this.setState({ loading: false, isChecked: true });
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
              defaultChecked={ isChecked }
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
};

export default MusicCard;
