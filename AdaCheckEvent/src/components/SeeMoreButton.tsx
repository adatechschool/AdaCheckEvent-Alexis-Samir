import React, { CSSProperties } from 'react';
import type, {event} from '../constants/Event';

type Props = {
    event: event;
    style?: CSSProperties;
}
export function SeeMoreButton({ event, style }: Props) {
    return (
        <div style={{...styles.container, ...style}}> 
        <button onClick={}>SEE MORE</button> 
        </div>
        )
    }
        

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
    }
} as CSSProperties;