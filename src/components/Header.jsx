import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    loading: true,
    user: '',
  };

  componentDidMount() {
    getUser().then((r) => this.setState({
      user: r.name,
      loading: false,
    }));
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { loading ? <Loading /> : user }
        </p>
      </header>
    );
  }
}

export default Search;
