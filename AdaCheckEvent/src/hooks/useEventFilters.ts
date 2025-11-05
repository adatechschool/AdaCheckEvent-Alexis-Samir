import { useState, useMemo } from 'react';
import type { Event } from '../constants/Event';
import type { FilterOptions } from '../components/FilterPopup';
import { normalizeText } from '../utils/normalizeText';

/**
 * Custom hook to manage event filtering and sorting
 * Handles search, filters, and sort logic in one place
 */
export function useEventFilters(events: Event[], searchValue: string) {
    // Filter state
    const [filters, setFilters] = useState<FilterOptions>({
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
    });

    // Get all unique categories from events
    const availableCategories = useMemo(() => {
        const categoriesSet = new Set<string>();
        events.forEach(event => {
            if (event.qfap_tags && Array.isArray(event.qfap_tags)) {
                event.qfap_tags.forEach(tag => categoriesSet.add(tag));
            }
        });
        return Array.from(categoriesSet);
    }, [events]);

    // Count active filters
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.sortBy !== 'none') count++;
        if (filters.districts.length > 0) count++;
        if (Object.values(filters.accessibility).some(v => v)) count++;
        if (filters.categories.length > 0) count++;
        if (filters.priceType !== null) count++;
        return count;
    }, [filters]);

    // Apply filters and sort
    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Apply search filter
        if (searchValue) {
            result = result.filter((event) => {
                const searchLower = normalizeText(searchValue);
                const parisDistrictMatch = searchLower.match(/paris\s+(\d{1,2})/);
                let matchesLocation = true;
                let remainingSearch = searchLower;

                if (parisDistrictMatch) {
                    const district = parisDistrictMatch[1].padStart(2, '0');
                    const expectedZipcode = `750${district}`;
                    matchesLocation = event.address_zipcode === expectedZipcode;
                    remainingSearch = searchLower.replace(/paris\s+\d{1,2}/, '').trim();
                }

                let matchesKeywords = true;
                if (remainingSearch) {
                    const keywords = remainingSearch.split(/\s+/).filter(word => word.length > 0);
                    matchesKeywords = keywords.every(keyword => {
                        const eventText = normalizeText(`${event.title} ${event.description} ${event.lead_texte} ${event.address_city || ''}`);
                        return eventText.includes(keyword);
                    });
                }

                return matchesLocation && matchesKeywords;
            });
        }

        // Apply district filter
        if (filters.districts.length > 0) {
            result = result.filter(event => 
                event.address_zipcode ? filters.districts.includes(event.address_zipcode) : false
            );
        }

        // Apply accessibility filter
        const accessibilityFilters = Object.entries(filters.accessibility)
            .filter(([_, value]) => value)
            .map(([key, _]) => key);
        
        if (accessibilityFilters.length > 0) {
            result = result.filter(event => 
                accessibilityFilters.some(key => event[key as keyof Event])
            );
        }

        // Apply category filter
        if (filters.categories.length > 0) {
            result = result.filter(event => 
                event.qfap_tags && event.qfap_tags.some(tag => filters.categories.includes(tag))
            );
        }

        // Apply price filter
        if (filters.priceType !== null) {
            result = result.filter(event => event.price_type === filters.priceType);
        }

        // Apply sorting
        if (filters.sortBy === 'date-asc') {
            result.sort((a, b) => {
                const dateA = a.date_start ? new Date(a.date_start).getTime() : 0;
                const dateB = b.date_start ? new Date(b.date_start).getTime() : 0;
                return dateA - dateB;
            });
        } else if (filters.sortBy === 'date-desc') {
            result.sort((a, b) => {
                const dateA = a.date_start ? new Date(a.date_start).getTime() : 0;
                const dateB = b.date_start ? new Date(b.date_start).getTime() : 0;
                return dateB - dateA;
            });
        }

        return result;
    }, [events, searchValue, filters]);

    return {
        filters,
        setFilters,
        filteredEvents,
        availableCategories,
        activeFiltersCount,
    };
}
