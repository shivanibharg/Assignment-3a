import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(){
    super();
    this.state={
      eusername: '',
      password: '',
      errors: {}
    };

    this.onChange= this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
      e.preventDefault();
      const user={
        eusername: this.state.eusername,
        password: this.state.password
        
       };
       console.log(user);
       axios.post('/api/users/login', user)
       .then(res=> console.log(res.data))
       .catch(err=>this.setState({errors:err.response.data}));

      }

  render() {
    return (
      <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your Instagram account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Email Address or UserName" name="eusername" value={this.state.eusername} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
export default Login;