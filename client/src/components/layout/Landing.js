import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/current');
    }
  }

  render() {
    return (
        <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Instagram
                </h1>
                <p className="lead1"> Create a social networking profile to share posts and photos</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-warning mr-2" >Sign In</Link>
                <Link to="/login" className="btn btn-lg btn-success">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);