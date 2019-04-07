const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
 let errors = {};

 data.username = !isEmpty(data.username) ? data.username : '';
 data.email = !isEmpty(data.email) ? data.email : '';
 data.password = !isEmpty(data.password) ? data.password : '';
 data.password2= !isEmpty(data.password2) ? data.password2: '';

 

 if(!validator.isLength(data.username, {min: 4, max:30})){
   errors.username = 'UserName must be between 4 and 30 characters';
  }

  if(validator.isEmpty(data.username)){
    errors.username = "UserName field is required";
   }

   if(validator.isEmpty(data.fullname)){
    errors.fullname = "Fullname field is required";
   }
  
  if(validator.isEmpty(data.email)){
    errors.email = "Email field is required";
   }

   if(!validator.isEmail(data.email)){
    errors.email = "Email is invalid";
   }

   

   if(!validator.isLength(data.password, {min: 6, max:30})){
    errors.password = 'Password must be between 6 and 30 characters';
   }

   if(validator.isEmpty(data.password)){
    errors.password = "Password field is required";
   }

   

  

   if(!validator.equals(data.password, data.password2)){
     errors.password2= 'Password does not match';
   }

   if(validator.isEmpty(data.password2)){
    errors.password2 = "Confirm password field is required";
   }

  return {
     errors,
     isValid: isEmpty(errors) 
  }
}