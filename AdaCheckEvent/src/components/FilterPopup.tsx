import { type CSSProperties, useState } from 'react';

export type SortOption = 'date-asc' | 'date-desc' | 'none';

export type FilterOptions = {
    sortBy: SortOption;
    districts: string[]; // Array of zipcodes like ['75001', '75002']
    accessibility: {
        pmr: boolean;
        blind: boolean;
        deaf: boolean;
        sign_language: boolean;
        mental: boolean;
    };
    categories: string[]; // Array of qfap_tags
    priceType: number | null; // 0 = free, 1 = paid, null = all
}

type Props = {
    onClose: () => void;
    onApply: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
    availableCategories: string[]; // All unique categories from events
}

const PARIS_DISTRICTS = [
    '75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
    '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'
];

export function FilterPopup({ onClose, onApply, currentFilters, availableCategories }: Props) {
    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    const handleReset = () => {
        const resetFilters: FilterOptions = {
            sortBy: 'none',
            districts: [],
            accessibility: {
                pmr: false,
                blind: false,
                deaf: false,
                sign_language: false,
                mental: false,
            },
            categories: [],
            priceType: null,
        };
        setFilters(resetFilters);
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const toggleDistrict = (zipcode: string) => {
        setFilters(prev => ({
            ...prev,
            districts: prev.districts.includes(zipcode)
                ? prev.districts.filter(d => d !== zipcode)
                : [...prev.districts, zipcode]
        }));
    };

    const toggleCategory = (category: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const toggleAccessibility = (key: keyof FilterOptions['accessibility']) => {
        setFilters(prev => ({
            ...prev,
            accessibility: {
                ...prev.accessibility,
                [key]: !prev.accessibility[key]
            }
        }));
    };

    return (
        <div style={styles.overlay} onClick={handleApply}>
            <div style={styles.container} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>🔍 Filtres et Tri</h2>
                    <button style={styles.closeButton} onClick={onClose}>✕</button>
                </div>

                <div style={styles.content}>
                    {/* Sort Section */}
                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>📊 Trier par date</h3>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.sortBy === 'none'}
                                    onChange={() => setFilters(prev => ({ ...prev, sortBy: 'none' }))}
                                    style={styles.radio}
                                />
                                <span>Sans tri</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.sortBy === 'date-asc'}
                                    onChange={() => setFilters(prev => ({ ...prev, sortBy: 'date-asc' }))}
                                    style={styles.radio}
                                />
                                <span>Date croissante (↑)</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.sortBy === 'date-desc'}
                                    onChange={() => setFilters(prev => ({ ...prev, sortBy: 'date-desc' }))}
                                    style={styles.radio}
                                />
                                <span>Date décroissante (↓)</span>
                            </label>
                        </div>
                    </section>

                    {/* Price Filter */}
                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>💰 Prix</h3>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.priceType === null}
                                    onChange={() => setFilters(prev => ({ ...prev, priceType: null }))}
                                    style={styles.radio}
                                />
                                <span>Tous</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.priceType === 0}
                                    onChange={() => setFilters(prev => ({ ...prev, priceType: 0 }))}
                                    style={styles.radio}
                                />
                                <span>Gratuit</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={filters.priceType === 1}
                                    onChange={() => setFilters(prev => ({ ...prev, priceType: 1 }))}
                                    style={styles.radio}
                                />
                                <span>Payant</span>
                            </label>
                        </div>
                    </section>

                    {/* Districts Filter */}
                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>📍 Arrondissements</h3>
                        <div style={styles.checkboxGrid}>
                            {PARIS_DISTRICTS.map(zipcode => (
                                <label key={zipcode} style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={filters.districts.includes(zipcode)}
                                        onChange={() => toggleDistrict(zipcode)}
                                        style={styles.checkbox}
                                    />
                                    <span>Paris {zipcode.slice(-2)}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Accessibility Filter */}
                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>♿ Accessibilité</h3>
                        <div style={styles.checkboxGrid}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.accessibility.pmr}
                                    onChange={() => toggleAccessibility('pmr')}
                                    style={styles.checkbox}
                                />
                                <span>♿ PMR</span>
                            </label>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.accessibility.blind}
                                    onChange={() => toggleAccessibility('blind')}
                                    style={styles.checkbox}
                                />
                                <span>👁️ Malvoyants</span>
                            </label>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.accessibility.deaf}
                                    onChange={() => toggleAccessibility('deaf')}
                                    style={styles.checkbox}
                                />
                                <span>👂 Malentendants</span>
                            </label>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.accessibility.sign_language}
                                    onChange={() => toggleAccessibility('sign_language')}
                                    style={styles.checkbox}
                                />
                                <span>🤟 Langue des signes</span>
                            </label>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={filters.accessibility.mental}
                                    onChange={() => toggleAccessibility('mental')}
                                    style={styles.checkbox}
                                />
                                <span>🧠 Handicap mental</span>
                            </label>
                        </div>
                    </section>

                    {/* Categories Filter */}
                    {availableCategories.length > 0 && (
                        <section style={styles.section}>
                            <h3 style={styles.sectionTitle}>🏷️ Catégories</h3>
                            <div style={styles.categoryGrid}>
                                {availableCategories.sort().map(category => (
                                    <label key={category} style={styles.categoryLabel}>
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            style={styles.checkbox}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer Buttons */}
                <div style={styles.footer}>
                    <button style={styles.resetButton} onClick={handleReset}>
                        🔄 Réinitialiser
                    </button>
                    <button style={styles.applyButton} onClick={handleApply}>
                        ✓ Appliquer
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        padding: '16px',
    } as CSSProperties,
    container: {
        backgroundColor: 'white',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column' as 'column',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    } as CSSProperties,
    header: {
        padding: '20px 24px',
        borderBottom: '2px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as CSSProperties,
    title: {
        margin: 0,
        fontSize: '1.5em',
        fontWeight: '700',
        color: '#333',
    } as CSSProperties,
    closeButton: {
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
    content: {
        flex: 1,
        overflowY: 'auto' as 'auto',
        padding: '24px',
    } as CSSProperties,
    section: {
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e8e8e8',
    } as CSSProperties,
    sectionTitle: {
        fontSize: '1.1em',
        fontWeight: '600',
        color: '#667eea',
        marginBottom: '16px',
        marginTop: '0',
    } as CSSProperties,
    radioGroup: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '12px',
    } as CSSProperties,
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '0.95em',
        color: '#555',
    } as CSSProperties,
    radio: {
        cursor: 'pointer',
        width: '18px',
        height: '18px',
    } as CSSProperties,
    checkboxGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '12px',
    } as CSSProperties,
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '0.9em',
        color: '#555',
    } as CSSProperties,
    checkbox: {
        cursor: 'pointer',
        width: '16px',
        height: '16px',
    } as CSSProperties,
    categoryGrid: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '10px',
        maxHeight: '200px',
        overflowY: 'auto' as 'auto',
    } as CSSProperties,
    categoryLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '0.9em',
        color: '#555',
        padding: '6px',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease',
    } as CSSProperties,
    footer: {
        padding: '20px 24px',
        borderTop: '2px solid #f0f0f0',
        display: 'flex',
        gap: '12px',
    } as CSSProperties,
    resetButton: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#f5f5f5',
        color: '#666',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    } as CSSProperties,
    applyButton: {
        flex: 2,
        padding: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    } as CSSProperties,
};
