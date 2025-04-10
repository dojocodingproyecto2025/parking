import * as reservationService from '../services/reservationService.js';

export const createReservation = async (req, res, next) => {
    try {
      const reservation = await reservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  };