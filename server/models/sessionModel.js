import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema(
    { // they must exactly match the already stored db
         userId:{
          type: String,
          required: true,
         },
        token: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
        ipAddress: {
          type: String,
        },
        userAgent: {
          type: String,
        },
        impersonatedBy: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Automatically manage timestamps
      }
    );
    
const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema, 'Session');
export default Session;










