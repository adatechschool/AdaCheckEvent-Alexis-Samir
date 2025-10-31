import { type CSSProperties, useState } from "react";
import type { Event } from "../constants/Event";
import { SeeMoreButton } from "./SeeMoreButton";
import { EventPopup } from "./EventPopup";
import { useFavorites } from "../context/FavoriteContext";
import FavoriteButton from "./FavoriteButton";

type Props = {
    Event: Event,
    style?: CSSProperties,
    onPopupChange?: (isOpen: boolean) => void
}

export function EventCard({ Event, style, onPopupChange }: Props) {
    const [isEventPopupOpen, setEventPopupOpen] = useState<boolean>(false)
    const { favorites, toggleFavorite } = useFavorites();

    // Check if THIS specific event is in favorites
    const isFavorite = favorites.includes(Event.id);

    const ToggleEventPopup = () => {
        const newState = !isEventPopupOpen;
        setEventPopupOpen(newState);
        if (onPopupChange) {
            onPopupChange(newState);
        }
    };

    return (
        <div style={{ ...styles.container, ...style }}>
            <FavoriteButton onClick={() => toggleFavorite(Event)} isFavorite={isFavorite} />
            <img src={Event.cover_url} alt={Event.cover_alt} style={styles.image} />
            <div style={styles.informations}>
                <h2 style={styles.title}>{Event.title}</h2>
                <p style={styles.description}>{Event.lead_texte}</p>
                <SeeMoreButton OnClick={ToggleEventPopup} />
            </div>
            {isEventPopupOpen ? (
                <EventPopup Event={Event} onClose={ToggleEventPopup} />
            )
                :
                null
            }
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        position: 'relative' as 'relative',
        border: "none",
        borderRadius: "16px",
        padding: "0",
        margin: "0",
        minWidth: '280px',
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#ffffff",
        color: "#333",
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    } as CSSProperties,
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '0',
        flexShrink: 0
    } as CSSProperties,
    informations: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        gap: "12px",
        flex: 1
    } as CSSProperties,
    description: {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '80px',
        lineHeight: '1.4em'
    } as CSSProperties,
    title: {
        fontSize: '1.2em',
        margin: '0',
        fontWeight: '700',
        color: '#222'
    } as CSSProperties,
} 