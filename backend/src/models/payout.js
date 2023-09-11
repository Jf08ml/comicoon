import { Schema, Types, model } from 'mongoose';

const payoutSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    emailPaypal: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    payouts: {
      type: [
        new Schema({
          _id: {
            type: Schema.Types.ObjectId,
            default: Types.ObjectId
          },
          amount: {
            type: Number
          },
          pagado: {
            type: Boolean
          },
          dateRequest: {
            type: Date,
            default: Date.now
          }
        })
      ]
    }
    
  });
  


export default model('Payout', payoutSchema);