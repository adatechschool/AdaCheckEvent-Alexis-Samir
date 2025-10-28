import type { Event } from "../constants/Event";
import type { CSSProperties } from "react";

type Props = {
    ObjetEvent: Event,
    style?: CSSProperties
}

export function EventCard({ ObjetEvent, style }: Props) {
    return (
        <div style={{...styles.container, ...style}}>
            <img src={ObjetEvent.cover_url} alt={ObjetEvent.cover_alt} />
            <div style={styles.informations}>
                <h2>{ObjetEvent.title}</h2>
                <p>{ObjetEvent.lead_texte}</p>
                
            </div>
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
        maxWidth: "400px",
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