import * as reservationService from '../services/reservationService.js';

export const createReservation = async (req, res, next) => {
    try {
      const reservation = await reservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  };

  export const getReservations = async (req, res) => {
    try {
      const reservations = await reservationService.getReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const deleteReservation = async (req, res, next) => {
    try {
      await reservationService.deleteReservation(req.params.id);
      res.status(200).json({ message: 'Reservación eliminada exitosamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };