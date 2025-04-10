import mongoose, {Schema, model} from 'mongoose';
 /*userId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},*/
const reservationSchema = new Schema({

  userId: { type: String, required: true },
  placa: { type: String, required: true },
  numeroSlot:{ type: Number, required: true },
})

export default model('Reservation', reservationSchema);