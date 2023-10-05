import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

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

    const startDeletingEvent = () => {
        // ToDo: Llegar al backend

        dispatch( onDeleteEvent() );
    };

    return {
        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    };
};
