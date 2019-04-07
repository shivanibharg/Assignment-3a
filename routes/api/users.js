const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');//for loading avatar
const bcrypt = require('bcryptjs');//for encrypting the password in database
const jwt = require('jsonwebtoken');//Create token by this library
const keys = require('../../config/keys');
const passport = require('passport');

//Load User model
const User = require('../../models/User');

//Load input validation
const validateRegisterInput = require('../../validation/register');

//Load login validation
const validateLoginInput = require('../../validation/login');



//@route POST api/users/register
//@desc Register User
//@access public
router.post('/register', (req, res)=>{
  const {errors, isValid} = validateRegisterInput(req.body);

  //Check validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({
       $or: [
               {email : req.body.email},
               {username: req.body.username}
             ]
      })  
      
    // Here the expectation is that the text box is also called email
  .then(user => {
      if(user){
          // errors.email = 'Email already exists';
          // errors.username = 'UserName already exists';
            //This checks for duplicates in email and username  
         if(user.email==req.body.email && user.username==req.body.username){
          errors.email = 'Email already exists';
           errors.username = 'UserName already exists';
                return res.status(400).json(
                  errors
                    // email: 'Email already exists',
                    // UserName: 'UserName already exists'
                )}   
          else if(user.email==req.body.email){
               errors.email='Email already exists';
                return res.status(400).json(errors)}
           else if(user.username==req.body.username){
               errors.username ='UserName already exists';
                return res.status(400).json(errors)}
                 
           }   
      else{

          const avatar = gravatar.url(req.body.email, {
              s: '200',
              r: 'pg',
              d: 'mm'
          });
          const newUser = new User ({
             email: req.body.email,
             fullname: req.body.fullname,
             username: req.body.username,
             password: req.body.password,
             avatar
          });
         bcrypt.genSalt(10, (err, salt) => {
           if(err){
               errors.password = 'Failed encrypting';
               return res.status(400).json(errors);
               }  
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err){
                    errors.password = 'Failed hashing';
                    return res.status(400).json(errors);
                    } 
                newUser.password=hash;
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            })
         }) 
      }
  })
  .catch(err => console.log(err));
});

//@route POST api/users/login
//@desc Login User
//@access public

router.post('/login', (req,res) => {
  

  const {errors, isValid}= validateLoginInput(req.body);

   //Check validation
   if(!isValid){
       return res.status(400).json(errors);
   }

   const eusername= req.body.eusername;
  const password = req.body.password;

 //Check for email as login
 
 User.findOne({
  $or: [
          {email : req.body.eusername},
          {username: req.body.eusername}
        ]
    })  
     .then(user => {
        if(!user){
          //if(user.username!=req.body.eusername && user.email!=req.body.eusername){
            errors.eusername='User not found';
            return res.status(400).json(errors);
          //}
          //else if(user.username==null && user.email)

        }
      
      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch =>{
          if(isMatch){
                        
            //If everything is successfull then we create a token here
            //User Matched
            //payload will comprise of various things like ID, name, avatar
            const payload = {
                id: user.id,
                username: user.username,
                avatar: user.avatar
            };

            //Sign token or create a token

            jwt.sign(payload, keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                 return res.json({
                     success: true,
                     token: 'Bearer ' + token
                 });
              });
        }
        else{
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
            });
            
        })
        .catch(err => console.log(err));
                     
                         
              

     })//end of router


// //@route POST api/users/login
// //@desc Login User
// //@access public

// router.post('/login', (req,res) => {
//     const email= req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;

//    //Check for email as login
//     if(email!=null && (username==null || username=='')){
//     User.findOne({email})
//        .then(user => {
//           if(!user){
//             errors.email='User not found';
//             return res.status(400).json(errors);
//           }
        
//         //Check password
//         bcrypt.compare(password, user.password)
//           .then(isMatch =>{
//             if(isMatch){
                          
//               //If everything is successfull then we create a token here
//               //User Matched
//               //payload will comprise of various things like ID, name, avatar
//               const payload = {
//                   id: user.id,
//                   username: user.username,
//                   avatar: user.avatar
//               };

//               //Sign token or create a token

//               jwt.sign(payload, keys.secretOrKey,
//                 {expiresIn: 3600},
//                 (err, token) => {
//                    return res.json({
//                        success: true,
//                        token: 'Bearer ' + token
//                    });
//                 });
//           }
//           else{
//             errors.password = 'Password incorrect';
//             return res.status(400).json(errors);
//           }
//               });
              
//           })
//           .catch(err => console.log(err));}
//           //Check for username as login
//           else if(username!=null && (email==null || email=='')){
//             User.findOne({username})
//                .then(user => {
//                   if(!user){
//                     errors.username = 'User not found';
//                     return res.status(400).json(errors);
//                   }
                
//                 //Check password
//                 bcrypt.compare(password, user.password)
//                   .then(isMatch =>{
//                       if(isMatch){
                          
//                           //If everything is successfull then we create a token here
//                           //User Matched
//                           //payload will comprise of various things like ID, name, avatar
//                           const payload = {
//                               id: user.id,
//                               username: user.username,
//                               avatar: user.avatar
//                           };

//                           //Sign token or create a token

//                           jwt.sign(payload, keys.secretOrKey,
//                             {expiresIn: 3600},
//                             (err, token) => {
//                                return res.json({
//                                    success: true,
//                                    token: 'Bearer ' + token
//                                });

//                             });
//                       }
//                       else{
//                         errors.password = 'Password incorrect';
//                         return res.status(400).json(errors);
//                       }
//                     });
//                   })
//                   .catch(err => console.log(err));}

//        })//end of router

//@route GET api/users/current or dashboard page
//@desc returns current user information
//@access private

router.get(
  '/current',
  passport.authenticate('jwt', {session:false}),
  (req,res) => {
   res.json({
     id: req.user.id,
     username: req.user.username,
     email: req.user.email
   });
  }
)
module.exports = router;
