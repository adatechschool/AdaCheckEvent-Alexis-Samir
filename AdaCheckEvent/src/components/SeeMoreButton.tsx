import { type CSSProperties } from 'react';


type Props = {
    style?: CSSProperties;
    OnClick: () => void
}
export function SeeMoreButton({style, OnClick }: Props) {
    return (
        <div style={{...styles.container, ...style}}> 
        <button onClick={() => {OnClick()}} style={{...styles.button}}>Voir Plus</button> 
        </div>
        )
    }
        

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '8px',
    } as CSSProperties,
    button: {
        padding: '10px 20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.9em',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    } as CSSProperties,
}