const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
    
  website: {
    type: String
  },
  bio: {
    type: String
  },
  gender: {
    type: String
   },
   location: {
     type: String
   },
   follow: [{
      user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
