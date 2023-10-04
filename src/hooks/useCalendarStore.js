import React from 'react';
import { useSelector } from 'react-redux';

export const useCalendarStore = () => {
    const { events } = useSelector( state => state.calendar );

    return {
        // propiedades
        events,

        // métodos
    };
};
