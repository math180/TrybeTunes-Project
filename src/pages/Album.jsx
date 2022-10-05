import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      list: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.requestApi(id);
  }

  requestApi = async (id) => {
    const music = await getMusics(id);
    this.setState({
      list: music,
      loading: false,
    });
  };

  render() {
    const { loading, list } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <h1 data-testid="artist-name">{ list[0].artistName }</h1>
        <h2 data-testid="album-name">{ list[0].collectionName }</h2>
        { list.map((track, i) => {
          if (i !== 0) {
            return (<MusicCard
              key={ track.trackId }
              previewUrl={ track.previewUrl }
              trackName={ track.trackName }
              trackId={ track.trackId }
            />);
          }
          return null;
        }) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
