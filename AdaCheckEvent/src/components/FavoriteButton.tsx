import {type CSSProperties} from "react";

type Props = {
    onClick: () => void;
    isFavorite: boolean;
}

const FavoriteButton = ({onClick, isFavorite}: Props) => {
    return (
        <button style={styles.closeButton} onClick={onClick}>{
            isFavorite ? '❤️'
                :
                '🤍'
        }</button>
    )
}

const styles = {
    closeButton: {
        position: 'absolute' as 'absolute',
        top: '16px',
        left: '16px',
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
}

export default FavoriteButton;