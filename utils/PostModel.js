// models/Post.js
import mongoose from 'mongoose';

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  username: String, // username is optional
  message: String,  // message is optional
});

// Create the Post model
const PostModel = mongoose.models.PostModel || mongoose.model('PostModel', postSchema);

export default PostModel;
