const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
 let errors = {};

 data.eusername = !isEmpty(data.eusername) ? data.eusername : '';
 //data.email = !isEmpty(data.email) ? data.email : '';
 data.password = !isEmpty(data.password) ? data.password : '';
 

 if(!validator.isLength(data.eusername, {min: 4, max:30})){
   errors.eusername = 'UserName must be between 4 and 30 characters';
  }

  if(validator.isEmpty(data.eusername)){
   errors.eusername = "UserName field is required";
  }
  
//   if(validator.isEmpty(data.email)){
//     errors.email = "Email field is required";
//    }

//    if(!validator.isEmail(data.email)){
//     errors.email = "Email is invalid";
//    }

   if(!validator.isLength(data.password, {min: 6, max:30})){
    errors.password = 'Password must be between 6 and 30 characters';
   }

   if(validator.isEmpty(data.password)){
    errors.password = "Password field is required";
   }

   
  return {
     errors,
     isValid: isEmpty(errors) 
  }
}