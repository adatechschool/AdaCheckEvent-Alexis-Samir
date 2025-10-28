import { type CSSProperties, useState } from "react";
import type { Event } from "../constants/Event";
import { SeeMoreButton } from "./SeeMoreButton";
import { EventPopup } from "./EventPopup";

type Props = {
    ObjetEvent: Event,
    style?: CSSProperties
}

export function EventCard({ ObjetEvent, style, }: Props) {
    const [isEventPopupOpen, setEventPopupOpen] = useState<boolean>(false)

    const ToggleEventPopup = () => {
        setEventPopupOpen(!isEventPopupOpen);
    };

    return (
        <div style={{ ...styles.container, ...style }}>
            <img src={ObjetEvent.cover_url} alt={ObjetEvent.cover_alt} style={{ height: '200px', width: '200px' }} />
            <div style={styles.informations}>
                <h2>{ObjetEvent.title}</h2>
                <p>{ObjetEvent.lead_texte}</p>
                <SeeMoreButton OnClick={ToggleEventPopup} />
            </div>
            {isEventPopupOpen ? (
                <EventPopup Event={ObjetEvent} onClose={ToggleEventPopup} />
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
        flexDirection: "row",
        border: "1px solid black",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        minWidth: '200px',
        maxWidth: '500px',
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        color: "#333",
        gap: "16px"
    } as CSSProperties,
    informations: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    } as CSSProperties
} 