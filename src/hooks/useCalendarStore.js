import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    };

    const startSavingEvent = async( calendarEvent ) => {
        try {
            if ( calendarEvent.id ) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                // Si tiene un id, significa que estoy actualizando
                // dispatch( onUpdateEvent(calendarEvent) );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) ); // o hacer esto para mandar un nuevo obj
                return;
            }
    
            // si no, estoy creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    };

    const startDeletingEvent = () => {
        // ToDo: Llegar al backend

        dispatch( onDeleteEvent() );
    };

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
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
        startLoadingEvents
    };
};
