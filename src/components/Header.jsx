import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
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
          { loading ? <Loading /> : `Olá, ${user}` }
          <Link data-testid="link-to-search" to="/search">search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">profile</Link>
        </p>
      </header>
    );
  }
}

export default Header;
