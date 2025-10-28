import type { Event } from '../constants/Event';
import React, { type CSSProperties } from 'react';

// Fonction utilitaire pour nettoyer le HTML (optionnel, pour plus de sécurité)
const sanitizeHtml = (html: string): string => {
    if (!html) return '';
    // Supprime les scripts et autres éléments dangereux
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '');
};

type Props = {
    Event: Event;
    style?: React.CSSProperties;
    onClose?: () => void;
}

export function EventPopup({Event, style, onClose}: Props) {

    return (
        <>
        {console.log("Popup Opened for event: ", Event.title)}
        
        <div style={styles.overlay} onClick={onClose}>
            <div style={{...styles.container, ...style}} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h1>{Event.title}</h1>
                <img src={Event.cover_url} alt={Event.cover_alt || Event.title} style={styles.image}/>              
                <div 
                    style={styles.description}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(Event.description) }}
                />
                <p><strong>Date de début :</strong> {Event.date_start}</p>
                <p><strong>Date de fin :</strong> {Event.date_end}</p>
                <p><strong>Addresse :</strong> {Event.address_street}, {Event.address_zipcode}, {Event.address_city}</p>
                <p><strong>Téléphone :</strong> {Event.contact_phone}</p>
                <p><strong>Mail :</strong> {Event.contact_mail}</p>
            </div>
        </div>
        </>
    )
}

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    } as CSSProperties,
    container: {
        border: '1px solid black',
        padding: '20px',
        position: 'relative' as 'relative',
        width: '200vh',
        maxHeight: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflowY: 'auto',
    } as CSSProperties,
    closeButton: {
        position: 'absolute' as 'absolute',
        top: '10px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#666',
        padding: '0',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    image: {
        width: '30%',
        maxHeight: '100%',
        objectFit: 'cover' as 'cover',
        borderRadius: '10px',
        marginBottom: '10px',
    } as CSSProperties,
    description: {
        lineHeight: '1.6',
        marginBottom: '15px',
        color: '#333',
    } as CSSProperties,
}