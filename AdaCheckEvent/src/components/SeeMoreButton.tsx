import { type CSSProperties } from 'react';


type Props = {
    style?: CSSProperties;
    OnClick: () => void
}
export function SeeMoreButton({style, OnClick }: Props) {
    return (
        <div style={{...styles.container, ...style}}> 
        <button onClick={() => {OnClick()}} style={{...styles.button}}>SEE MORE</button> 
        </div>
        )
    }
        

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
    } as CSSProperties,
    button: {
        padding: '10px 20px', 
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    } as CSSProperties,
}