import { type CSSProperties } from 'react';
import { usePageManagerView } from '../context/PageManagerViewContext';

type Props = {
    style?: CSSProperties;
}

export function ViewButton({style}: Props) {
    const { currentPage, setCurrentPage } = usePageManagerView();

    const handleClick = () => {
        setCurrentPage(currentPage === "home" ? "favorites" : "home");
    };

    return (
        <button onClick={handleClick} style={{...styles.actionButton, ...style}}>
            {currentPage === "home" ? "❤️" : "🏠"}
        </button>
    );
}

const styles = {
    actionButton: {
        bottom: '2px',
        right: '24px',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.5em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
}