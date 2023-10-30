// pages/api/create.js
import { connectToDatabase } from "@/utils/db";

import PostModel from "@/utils/PostModel";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const db = await connectToDatabase();
  
      const newPost = new PostModel({
        username: req.body.username,
        message: req.body.message,
      });

      // Save the post to the database
      const savedPost = await newPost.save();

      res.status(201).json({ message: 'Post created successfully', data: savedPost });
    } catch (error) {
      res.status(500).json({ message: 'Post creation failed', error: error.message });
    }
  } else {
    res.status(405).end(); 
  }
}

