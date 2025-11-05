import type {Event} from '../constants/Event';
import {type CSSProperties, useEffect} from 'react';
import {useFavorites} from '../context/FavoriteContext';
import FavoriteButton from './FavoriteButton';
import {ScrollTopButton} from './ScrollTopButton';

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
    const {favorites, toggleFavorite} = useFavorites();

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
                    <button style={styles.closeButton} onClick={onClose}>ⓧ</button>

                    {/* Title */}
                    <h1 style={styles.title}>{Event.title}</h1>

                    {/* Cover Image */}
                    <img src={Event.cover_url} alt={Event.cover_alt || Event.title} style={styles.image} />

                    {/* Tags */}
                    {Event.qfap_tags ? (
                        Event.qfap_tags.length > 0 && (
                            <div style={styles.tagsContainer}>
                                {Event.qfap_tags.map((tag, index) => (
                                    <span key={index} style={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        )) : null}

                    {/* Description */}
                    <div
                        style={styles.description}
                        dangerouslySetInnerHTML={{__html: sanitizeHtml(Event.description)}}
                    />

                    {/* Dates Section */}
                    {(Event.date_start || Event.date_end || Event.date_description) && (
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📅 Dates et Horaires</h2>
                            {Event.date_start && (
                                <p style={styles.infoLine}>
                                    <strong>Début :</strong> {formatDate(Event.date_start)}
                                </p>
                            )}
                            {Event.date_end && (
                                <p style={styles.infoLine}>
                                    <strong>Fin :</strong> {formatDate(Event.date_end)}
                                </p>
                            )}
                            {Event.date_description && (
                                <p style={styles.infoLine} dangerouslySetInnerHTML={{__html: sanitizeHtml(Event.date_description)}}></p>
                            )}
                        </div>
                    )}

                    {/* Location Section */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>📍 Lieu</h2>
                        {(Event.address_name || Event.address_street || Event.address_zipcode || Event.address_city) ? (
                            <>
                                {Event.address_name && <p style={styles.infoLine}><strong>{Event.address_name}</strong></p>}
                                <p style={styles.infoLine}>
                                    {Event.address_street && `${Event.address_street}`}
                                    {Event.address_city && `, ${Event.address_city}`}
                                    {Event.address_zipcode && ` ${Event.address_zipcode}`}
                                </p>
                            </>
                        ) : Event.text ? (
                            <p style={styles.infoLine}>{Event.text}</p>
                        ) : (
                            <p style={styles.infoLine}>Adresse non spécifiée</p>
                        )}
                    </div>

                    {/* Price Section */}
                    {(Event.price_type !== null || Event.price_detail !== null) && (
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>💰 Tarifs</h2>
                            {Event.price_type ? (
                                <p style={styles.infoLine}>
                                    <strong>Type :</strong> {Event.price_type}
                                </p>
                            ) : null}
                            {Event.price_detail ? (
                                <p style={styles.infoLine} dangerouslySetInnerHTML={{__html: sanitizeHtml(Event.price_detail)}}></p>
                            ) : null}
                        </div>
                    )}

                    {/* Contact Section */}
                    {(Event.contact_phone || Event.contact_mail || Event.contact_url) && (
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📞 Contact</h2>
                            {Event.contact_phone && (
                                <p style={styles.infoLine}>
                                    <strong>Téléphone :</strong> <a href={`tel:${Event.contact_phone}`} style={styles.link}>{Event.contact_phone}</a>
                                </p>
                            )}
                            {Event.contact_mail && (
                                <p style={styles.infoLine}>
                                    <strong>Email :</strong> <a href={`mailto:${Event.contact_mail}`} style={styles.link}>{Event.contact_mail}</a>
                                </p>
                            )}
                            {Event.contact_url && (
                                <p style={styles.infoLine}>
                                    <strong>Site web :</strong> <a href={Event.contact_url} target="_blank" rel="noopener noreferrer" style={styles.link}>Visiter le site</a>
                                </p>
                            )}
                        </div>
                    )}

                    {/* Accessibility Section */}
                    {(Event.pmr || Event.blind || Event.deaf || Event.sign_language || Event.mental) && (
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>♿ Accessibilité</h2>
                            <div style={styles.accessibilityGrid}>
                                {Event.pmr && <span style={styles.accessibilityBadge}>♿ PMR</span>}
                                {Event.blind && <span style={styles.accessibilityBadge}>👁️ Malvoyants</span>}
                                {Event.deaf && <span style={styles.accessibilityBadge}>👂 Malentendants</span>}
                                {Event.sign_language && <span style={styles.accessibilityBadge}>🤟 Langue des signes</span>}
                                {Event.mental && <span style={styles.accessibilityBadge}>🧠 Handicap mental</span>}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={styles.buttonsContainer}>
                        {Event.url && (
                            <a href={Event.url} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
                                🔗 Voir sur Paris.fr
                            </a>
                        )}
                        {Event.access_link && (
                            <a href={Event.access_link} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
                                {Event.access_link_text || '🎟️ Réserver / Plus d\'infos'}
                            </a>
                        )}
                    </div>

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
    title: {
        paddingTop: '16px',
        fontSize: '1.8em',
        fontWeight: '700',
        color: '#333',
        marginBottom: '16px',
        lineHeight: '1.3',
    } as CSSProperties,
    image: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover' as 'cover',
        borderRadius: '12px',
        marginBottom: '16px',
    } as CSSProperties,
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        gap: '8px',
        marginBottom: '16px',
    } as CSSProperties,
    tag: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '0.85em',
        fontWeight: '500',
    } as CSSProperties,
    description: {
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#555',
        fontSize: '0.95em',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0',
    } as CSSProperties,
    section: {
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        border: '1px solid #e8e8e8',
    } as CSSProperties,
    sectionTitle: {
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#667eea',
        marginBottom: '12px',
        marginTop: '0',
    } as CSSProperties,
    infoLine: {
        margin: '8px 0',
        lineHeight: '1.6',
        color: '#555',
        fontSize: '0.95em',
    } as CSSProperties,
    link: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s ease',
    } as CSSProperties,
    accessibilityGrid: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        gap: '8px',
    } as CSSProperties,
    accessibilityBadge: {
        display: 'inline-block',
        padding: '6px 12px',
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
        borderRadius: '8px',
        fontSize: '0.85em',
        fontWeight: '500',
        border: '1px solid #c8e6c9',
    } as CSSProperties,
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '12px',
        marginTop: '24px',
        marginBottom: '60px', // Space for ScrollTopButton
    } as CSSProperties,
    actionButton: {
        display: 'block',
        width: '100%',
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
        textDecoration: 'none',
        textAlign: 'center' as 'center',
    } as CSSProperties,
}