import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    user: '',
    isDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      user: target.value,
    }, () => {
      const { user } = this.state;
      const limit = 3;
      this.setState({ isDisabled: user.length < limit });
    });
  };

  handleClick = () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    createUser({ name: user }).then(() => history.push('/search'));
  };

  render() {
    const { isDisabled, user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            data-testid="login-name-input"
            type="text"
            name="user"
            id="name"
            autoComplete="off"
            value={ user }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ isDisabled }
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
