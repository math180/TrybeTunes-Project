import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  /* constructor() {
    super();
    this.state = {

    };
  }
*/

  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div>
        { trackName }
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
