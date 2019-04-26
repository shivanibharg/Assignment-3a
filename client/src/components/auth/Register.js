import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor(){
    super();
    this.state ={
      fullname:'',
      username:'',
      email:'',
      password:'',
      password2:'',
      errors: {},
    };
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  onSubmit(e){
    e.preventDefault();
    const newUser={
      fullname: this.state.fullname,
      username:this.state.username,
      email:this.state.email,
      password: this.state.password,
      password2: this.state.password2
     };
    
    this.props.registerUser(newUser);
       
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({error:nextProps.errors});
      }
    }
  render() {
   const {errors} = this.state;
   

    return (
    <div className="register">
  
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign In</h1>
          <p className="lead text-center">Create your Instagram account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className={classnames('form-control form-control-lg', {'is-invalid':errors.fullname})} placeholder="Full Name" name="fullname" value={this.state.fullname} onChange={this.onChange} required /> {errors.fullname && (<div className="invalid-feedback">
              {errors.fullname}
              </div>)}
            </div>
            <div className="form-group">
              <input type="text" className={classnames('form-control form-control-lg', {'is-invalid':errors.username})} placeholder="UserName" name="username" value={this.state.username} onChange={this.onChange} required />
              {errors.username && (<div className="invalid-feedback">
              {errors.username}
              </div>)}
            </div>
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg', {'is-invalid':errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              {errors.email && (<div className="invalid-feedback">
              {errors.email}</div>)}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid':errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
              {errors.password && (<div className="invalid-feedback">
              {errors.password}</div>)}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid':errors.password2})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
              {errors.password2 && (<div className="invalid-feedback">
              {errors.password2}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>

    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   auth:state.auth,
   errors: state.errors

})
  
export default connect(mapStateToProps, {registerUser})(Register);