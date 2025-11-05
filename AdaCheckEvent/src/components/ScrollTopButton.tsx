import {type CSSProperties} from "react";

type Props = {
    ancrage: string;
    style?: CSSProperties;
}

// Function to scroll to top of the page or specific element
const scrollToTop = (ancrage: string) => {
    if (ancrage === 'window' || ancrage === 'body') {
        // Scroll the main page
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        // Scroll a specific container
        const element = document.querySelector(ancrage) as HTMLElement;
        if (element) {
            element.scrollTo({top: 0, behavior: 'smooth'});
        }
    }
};

export function ScrollTopButton({ancrage, style}: Props) {
    return (
        <button style={{...styles.actionButton, ...style}} onClick={() => scrollToTop(ancrage)}>⬆️</button>
    )
}

const styles = {
    actionButton: {
        position: 'sticky' as 'sticky',
        bottom: '12px', 
        right: '12px',
        marginLeft: 'auto',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.5em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        zIndex: 1000,
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float: 'right' as 'right',
    } as CSSProperties,
}