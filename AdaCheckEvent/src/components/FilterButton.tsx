import { type CSSProperties } from 'react';

type Props = {
    onClick: () => void;
    activeFiltersCount?: number;
    style?: CSSProperties;
}

export function FilterButton({ onClick, activeFiltersCount = 0, style }: Props) {
    return (
        <button 
            onClick={onClick} 
            style={{
                ...styles.button,
                ...style
            }}
            title="Filtres et tri"
        >
            🔍
            {activeFiltersCount > 0 && (
                <span style={styles.badge}>{activeFiltersCount}</span>
            )}
        </button>
    );
}

const styles = {
    button: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontSize: '1.2em',
        cursor: 'pointer',
        padding: '12px 16px',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        transition: 'all 0.3s ease',
        position: 'relative' as 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    badge: {
        position: 'absolute' as 'absolute',
        top: '-8px',
        right: '-8px',
        background: '#ff4757',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7em',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(255, 71, 87, 0.4)',
    } as CSSProperties,
};
