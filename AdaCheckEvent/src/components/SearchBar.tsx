import { type CSSProperties } from 'react';


type Props = {
    style? : CSSProperties
    inputValue: string,
    setInputValue: Dispatch<SetStateAction<string>>
};

export function SearchBar({style, inputValue, setInputValue}: Props) {
  return (
    <div className="search-bar" style={{...styles.container, ...style}}>
      <input type="text" placeholder="Search..." onChange={() => setInputValue}/>
      <button>Search</button>
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
  } as CSSProperties
};