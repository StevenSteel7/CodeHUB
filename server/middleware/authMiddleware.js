import userModel from "../models/userModel.js";
import Session from '../models/sessionModel.js';

// To check if user is authenticaed then only sign in



export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
   
     
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const latestSession = await Session.findOne({token}).sort({ createdAt: -1 }).select("userId"); ;

    if (!latestSession) {
      return res.status(401).json({ error: 'No session found for user' });
    }
    
    console.log(latestSession); 
    req.userId = latestSession.userId;

    
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};