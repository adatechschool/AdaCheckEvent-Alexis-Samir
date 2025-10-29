import {type CSSProperties} from 'react';


type Props = {
  style?: CSSProperties;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchBar({style, setInputValue}: Props) {
  return (
    <div className="search-bar" style={{...styles.container, ...style}}>
      <div style={{...styles.inputWrapper}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={styles.icon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" placeholder="Search..." onChange={(e) => {setInputValue(e.target.value);}} style={{...styles.inputSections}} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    margin: '0 auto'
  } as CSSProperties,
  inputSections: {
    border: 'none',
    borderRadius: '8px',
    padding: '8px',
    flex: 1,
    height: '32px',
    fontSize: '16px',
    backgroundColor: 'transparent',
    outline: 'none',
    color: '#2c3e50'
  } as CSSProperties,
  inputWrapper : {
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    gap: '12px'
  } as CSSProperties,
  icon: {
    width: '24px',
    height: '24px',
    color: '#667eea',
    flexShrink: 0
  } as CSSProperties,
};