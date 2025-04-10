import Reservation from '../models/reservation.js';

export const createReservation = async (reservationData) => {    
    const reservation = new Reservation(reservationData);
    return await reservation.save();
  };