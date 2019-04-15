const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'username', 'email'])
      .then(profile => {
        if (!profile){
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
)

// @route   GET api/profile/all(WHICH CAN BE FOLLOWED)
// @desc    Get all profiles
// @access  Private

router.get(
  '/all', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
// router.get('/all', (req, res) => {
const errors = {};

//Profile.find({})
console.log(req.user.id);
  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    console.log("data found"+req.user.id);
    
     if (profile.follow.filter(follows => follows.user.toString()).length > 0) {
         console.log(profile.bio);
         console.log(profile.user.id);
         //console.log(profile.follow.user);

        //Shravani- The below command does not seem to filter out the users who are not in profile.follow.user field
         
        Profile.find({ user: {$nin: profile.follow.filter(follows => follows.user.toString())}})
        //Profile.find({ $match: { user: mongoose.Types.ObjectId(profile.follow.filter(follows=> follows.user.toString()))}})
        //Profile.find({owner: User.user()}, {fields: {user: 1}}).fetch()
                       
        .then(users=>{
          //console.log("Profile info"+ profile.follow.filter(follows=>follow.user.toString()));
          res.json(users)})
          console.log(profile.website);
        }
      else if(profile.follow.filter(follows => follows.user.toString()).length===0)
      
      {//Can change to user table by saying User.find({_id: {$ne: req.user.id}})
      //If you did not find any user that you follow then display all users in database
        Profile.find({ user: {$ne: req.user.id}})
         .then(users=>{
          res.json(users)})
          console.log("No follow found");
       }
        
      })
      .catch(err => res.status(404).json({ profile: "No profiles found" }))
      
    });
    
     
    
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/user/:user_id(FOLLOW)
// @desc    Get profile by user ID
// @access  Private

router.post('/user/:user_id', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
     
    .then(profile => {
      
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      else if(req.user.id===req.params.user_id){
        errors.noFollow= "You cannot follow yourself";
        res.status(404).json(errors);
      }

      profile.follow.unshift({ user: req.params.user_id });

          profile.save().then(profiles => res.json(profiles));
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    //if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    //if (req.body.status) profileFields.status = req.body.status;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.location) profileFields.location = req.body.location;
   
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
        } //else {

      //   // Check if handle exists
      //   Profile.findOne({ handle: profileFields.handle })
      //   .then(profile => {
      //     if (profile) {
      //       errors.handle = 'That handle already exists';
      //       res.status(400).json(errors);
      //     }
        // Save Profile
         new Profile(profileFields)
         .save()
         .then(profile => res.json(profile));
        //});
      //}
    });
  }
);


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);



module.exports = router;
