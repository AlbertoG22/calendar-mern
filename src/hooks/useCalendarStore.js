import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    };

    const startSavingEvent = async( calendarEvent ) => {
        if ( calendarEvent._id ) {
            // Si tiene un id, significa que estoy actualizando
            // dispatch( onUpdateEvent(calendarEvent) );
            dispatch( onUpdateEvent({ ...calendarEvent }) ); // o hacer esto para mandar un nuevo obj
        } else {
            // si no, estoy creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
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
