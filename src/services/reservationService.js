import Reservation from '../models/reservation.js';


export const createReservation = async (reservationData) => {
  try {
    const existingReservation = await Reservation.findOne({ 
      numeroSlot: reservationData.numeroSlot 
    });

    if (existingReservation) {
      throw new Error(`El slot ${reservationData.numeroSlot} ya está ocupado`);
    }

    const reservation = new Reservation(reservationData);
/*
    const productData = {
      name: `Slot A-${reservationData.numeroSlot}`,
      description: "Estacionamiento",
      price: 50
    };

    const session = await purcharseService.createPurchase(productData);    */
    return await reservation.save();
    
  } catch (error) {
    console.error("Error al crear reservación:", error);
    throw error;
  }
};

export const getReservations = async () => {
  try {    
    const reservations = await Reservation.find({});
    
    const spots = Array.from({ length: 19 }, (_, i) => {
      const spotNumber = `A${i + 1}`;
      const reservation = reservations.find(r => r.numeroSlot === i + 1);

      if (reservation) {
        return {
          _id: reservation._id.toString(),
          spotNumber,
          isOccupied: true,
          userId: reservation.userId?.toString() || null,
          placa: reservation.placa || null,
        };
      }
            
      return {
        _id: null,
        spotNumber,
        isOccupied: false,
        userId: null,
        placa: null
      };
    });

    return spots;
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    
    if (!deletedReservation) {
      throw new Error('Reservación no encontrada');
    }
    
    return deletedReservation;
  } catch (error) {
    console.error("Error al eliminar reservación:", error);
    throw error;
  }
};