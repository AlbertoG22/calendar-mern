import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    };

    const startSavingEvent = async( calendarEvent ) => {
        // hacer llamado al backend

        if ( calendarEvent._id ) {
            // Si tiene un id, significa que estoy actualizando
            // dispatch( onUpdateEvent(calendarEvent) );
            dispatch( onUpdateEvent({ ...calendarEvent }) ); // o hacer esto para mandar un nuevo obj
        } else {
            // si no, estoy creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    };

    return {
        // propiedades
        events,
        activeEvent,

        // métodos
        setActiveEvent,
        startSavingEvent,
    };
};
