import type {Event} from '../constants/Event';
import {type CSSProperties, useEffect} from 'react';
import {useFavorites} from '../context/FavoriteContext';
import FavoriteButton from './FavoriteButton';
import { ScrollTopButton } from './ScrollTopButton';

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
    });
}

export function EventPopup({Event, style, onClose}: Props) {
    const { favorites, toggleFavorite } = useFavorites();

    // Check if THIS specific event is in favorites
    const isFavorite = favorites.includes(Event.id);

    // Freeze body scroll when popup is open
    useEffect(() => {
        // Save current scroll position
        const scrollY = window.scrollY;
        
        // Prevent body scroll
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        // Cleanup: restore scroll when popup closes
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    return (
        <>
            {console.log("Popup Opened for event: ", Event.title)}

            <div style={styles.overlay} onClick={onClose}>
                <div data-popup-container style={{...styles.container, ...style}} onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton onClick={() => toggleFavorite(Event)} isFavorite={isFavorite} />
                    <button style={styles.closeButton} onClick={onClose}>✕</button>
                    <h1 style={{paddingTop: '16px'}}>{Event.title}</h1>
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
                    <p><strong>Addresse :</strong> {
                        Event.address_name ||
                            Event.address_street ||
                            Event.address_zipcode ||
                            Event.address_city ? (
                            <>
                                {Event.address_name ? `${Event.address_name} ` : ''}
                                {Event.address_street ? `, ${Event.address_street} ` : ''}
                                {Event.address_zipcode ? `, ${Event.address_zipcode} ` : ''}
                                {Event.address_city ? `, ${Event.address_city} ` : ''}
                            </>
                        )
                            :
                            Event.text ? Event.text : null
                    }

                    </p>

                    {Event.contact_phone ? (
                        <p><strong>Téléphone :</strong> {Event.contact_phone}</p>
                    )
                        :
                        null
                    }
                    {Event.contact_mail ? (
                        <p><strong>Mail :</strong> {Event.contact_mail}</p>
                    )
                        :
                        null
                    }
                    <ScrollTopButton ancrage="[data-popup-container]" />
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '16px',
    } as CSSProperties,
    container: {
        border: 'none',
        padding: '24px',
        position: 'relative' as 'relative',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'white',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        borderRadius: '20px',
        overflowY: 'auto' as 'auto',
    } as CSSProperties,
    closeButton: {
        position: 'absolute' as 'absolute',
        top: '16px',
        right: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#ffffff',
        padding: '0',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
        transition: 'all 0.3s ease',
    } as CSSProperties,
    image: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover' as 'cover',
        borderRadius: '12px',
        marginBottom: '16px',
    } as CSSProperties,
    description: {
        lineHeight: '1.6',
        marginBottom: '20px',
        color: '#555',
        fontSize: '0.95em',
    } as CSSProperties,
    actionButton: {
        width: '100%',
        marginTop: '16px',
        padding: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    } as CSSProperties,
}