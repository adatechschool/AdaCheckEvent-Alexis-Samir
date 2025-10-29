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
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9'
  } as CSSProperties,
  inputSections: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px',
    flex: 1,
    height: '25px'
  } as CSSProperties,
  inputWrapper : {
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    gap: '4px'
  } as CSSProperties,
  icon: {
    width: '20px',
    height: '20px',
    color: '#666'
  } as CSSProperties,
};