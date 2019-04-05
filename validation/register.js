const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
 let errors = {};

if(!validator.isLength(data.username, {min: 4, max:30})){
  errors.name = 'Name must be between 4 and 30 characters';
  }
  return {
     errors,
     isValid: isEmpty(errors) 
  }
}