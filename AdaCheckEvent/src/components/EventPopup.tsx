import type { Event } from '../../types/Event';
import React, { useState, type CSSProperties } from 'react';

type Props = {
    Event: Event;
    style?: React.CSSProperties;
}

export function EventPopup({Event, style}: Props) {

    return (
        <>
        {console.log("Popup Oppend for event: ", Event.title)}
        <div style={{...styles.container, ...style}}>
        </div>
        </>
    )
}

const styles = {
    container: {
        border: '1px solid black',
        padding: '20px',
        position: 'fixed' as 'fixed',
        margin: 'auto',
        width: '200px',
        height: '200px',
        backgroundColor: 'white',
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflowY: 'auto',
    } as CSSProperties,
}