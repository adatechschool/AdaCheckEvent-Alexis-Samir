import type {Event} from '../constants/Event';
import {type CSSProperties} from 'react';

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
    style?: CSSProperties;
    onClose?: () => void;
}

// Utility functions
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

        ;
}

export function EventPopup({Event, style, onClose}: Props) {

    return (
        <>
            {console.log("Popup Opened for event: ", Event.title)}

            <div style={styles.overlay} onClick={onClose}>
                <div style={{...styles.container, ...style}} onClick={(e) => e.stopPropagation()}>
                    <button style={styles.closeButton} onClick={onClose}>X</button>
                    <h1>{Event.title}</h1>
                    <img src={Event.cover_url} alt={Event.cover_alt || Event.title} style={styles.image} />
                    <div
                        style={styles.description}
                        dangerouslySetInnerHTML={{__html: sanitizeHtml(Event.description)}}
                    />
                    {Event.date_start ? (
                        <p><strong>Date de début :</strong> {formatDate(Event.date_start)}</p>
                    )
                        :
                        null
                    }
                    {Event.date_end ? (
                        <p><strong>Date de fin :</strong> {formatDate(Event.date_end)}</p>
                    )
                        :
                        null
                    }
                    <p><strong>Addresse :</strong> {Event.address_name ? Event.address_name + ', ' : ''} {Event.address_street}, {Event.address_zipcode}, {Event.address_city}</p>
                    {Event.contact_phone ? (
                        <p><strong>Téléphone :</strong> {formatDate(Event.contact_phone)}</p>
                    )
                        :
                        null
                    }
                     {Event.contact_mail ? (
                        <p><strong>Mail :</strong> {formatDate(Event.contact_mail)}</p>
                    )
                        :
                        null
                    }
                    <button style={{backgroundColor: '#f00'}} onClick={onClose}>Fermer</button>
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
        width: '120vh',
        maxHeight: '80vh',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflowY: 'auto',
    } as CSSProperties,
    closeButton: {
        position: 'absolute' as 'absolute',
        top: '10px',
        right: '15px',
        background: 'red',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#f4f0f0ff',
        padding: '0',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    image: {
        width: '30%',
        maxHeight: '90%',
        objectFit: 'cover' as 'cover',
        borderRadius: '10px',
        marginBottom: '10px',
    } as CSSProperties,
    description: {
        lineHeight: '1.6',
        marginBottom: '15px',
        color: '#333',
        alignContent: 'left',
    } as CSSProperties,
}