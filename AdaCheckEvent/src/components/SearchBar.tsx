import , { type CSSProperties } from 'react';


type Props = {
    style? : CSSProperties
};

export function SearchBar({style}: Props) {
  return (
    <div className="search-bar" style={{...styles.container, ...style}}>
      <input type="text" placeholder="Search..." />
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