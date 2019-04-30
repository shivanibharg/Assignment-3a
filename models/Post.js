const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    //required: true
    
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  unlikes:[
    {
      user:{
        type:Schema.Types.ObjectId,
        ref:'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        
      },
      username: {
        type: String
      },
      
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  image:{
    type: String,
    
  },
  video:
  {
    type: String,
    
  },

  likecounter:{
    type: Number,
    
  },
  dislikecounter:{
    type: Number,
    
  }
});

module.exports = Post = mongoose.model('post', PostSchema);