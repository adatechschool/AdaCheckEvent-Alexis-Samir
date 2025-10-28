import { type CSSProperties } from 'react';


type Props = {
    style?: CSSProperties;
    OnClick: () => void
}
export function SeeMoreButton({style, OnClick }: Props) {
    return (
        <div style={{...styles.container, ...style}}> 
        <button onClick={() => {OnClick()}}>SEE MORE</button> 
        </div>
        )
    }
        

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
    } as CSSProperties
} 