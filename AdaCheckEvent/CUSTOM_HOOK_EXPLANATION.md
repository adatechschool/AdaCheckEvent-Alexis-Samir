# useEventFilters - Custom Hook Documentation

## What is a Custom Hook?

A **custom hook** is just a JavaScript function that:
1. Starts with the word `use` (React convention)
2. Can use other React hooks inside (useState, useEffect, useMemo, etc.)
3. Returns data and functions that components can use

Think of it like a **reusable recipe** for logic you need in multiple places!

---

## How `useEventFilters` Works

### Before (Complex Component):
```typescript
export function Home() {
    const [inputValue, setInputValue] = useState('')
    const [filters, setFilters] = useState({...})
    const {listEvent} = useAPI()
    
    // 100+ lines of filtering logic here...
    const filtered = useMemo(() => {
        // complex filtering...
    }, [listEvent, inputValue, filters])
    
    // 20+ lines to count filters...
    const count = useMemo(() => {
        // count logic...
    }, [filters])
    
    // 15+ lines to extract categories...
    const categories = useMemo(() => {
        // category extraction...
    }, [listEvent])
    
    return <div>...</div>
}
```

### After (Clean Component with Custom Hook):
```typescript
export function Home() {
    const [inputValue, setInputValue] = useState('')
    const {listEvent} = useAPI()
    
    // ALL the filtering logic in ONE line! 🎉
    const {
        filters,
        setFilters,
        filteredEvents,
        availableCategories,
        activeFiltersCount
    } = useEventFilters(listEvent, inputValue)
    
    return <div>...</div>
}
```

---

## How to Use It

### 1. Import the hook:
```typescript
import {useEventFilters} from '../hooks/useEventFilters'
```

### 2. Call it in your component:
```typescript
const {
    filters,              // Current filter settings
    setFilters,           // Function to update filters
    filteredEvents,       // Events after filtering & sorting
    availableCategories,  // All unique categories
    activeFiltersCount    // Number of active filters (for badge)
} = useEventFilters(listEvent, inputValue)
```

### 3. Use the returned values:
```typescript
// Display filtered events
{filteredEvents.map(event => <EventCard Event={event} />)}

// Show filter count badge
<FilterButton activeFiltersCount={activeFiltersCount} />

// Update filters
<FilterPopup onApply={(newFilters) => setFilters(newFilters)} />
```

---

## What's Inside the Hook?

### State Management:
```typescript
const [filters, setFilters] = useState({
    sortBy: 'none',
    districts: [],
    accessibility: {...},
    categories: [],
    priceType: null,
})
```

### Performance Optimization (useMemo):
```typescript
// Only recalculate when events change
const availableCategories = useMemo(() => {
    // Extract unique categories...
}, [events])

// Only recalculate when filters change
const activeFiltersCount = useMemo(() => {
    // Count active filters...
}, [filters])

// Only recalculate when events, search, or filters change
const filteredEvents = useMemo(() => {
    // Apply all filters...
}, [events, searchValue, filters])
```

### Return Values:
```typescript
return {
    filters,              // For FilterPopup
    setFilters,           // To update filters
    filteredEvents,       // To display
    availableCategories,  // For FilterPopup
    activeFiltersCount,   // For FilterButton badge
}
```

---

## Benefits

### ✅ **Reusable**
- Use in Home.tsx ✓
- Use in Favorites.tsx ✓
- Use in any new page ✓

### ✅ **Cleaner Code**
- Home.tsx: ~150 lines → ~30 lines
- Favorites.tsx: ~150 lines → ~35 lines
- All logic in one place!

### ✅ **Easier to Test**
- Test the hook independently
- Mock data easily

### ✅ **Easier to Maintain**
- Bug in filtering? Fix in ONE place
- Add new filter? Update ONE file

---

## Comparison with Other Approaches

### Custom Hook (Current):
```typescript
// ✅ Logic separate from UI
// ✅ Reusable across components
// ✅ Easy to test
const {filteredEvents} = useEventFilters(events, search)
```

### Context:
```typescript
// ❌ Global state (overkill for this)
// ❌ More boilerplate
const {filteredEvents} = useFilterContext()
```

### Props:
```typescript
// ❌ Prop drilling nightmare
<Home onFilter={...} onSort={...} filters={...} />
```

### Inline (Original):
```typescript
// ❌ Duplicated code
// ❌ Hard to maintain
// ❌ Long component files
const filtered = events.filter(...)
```

---

## When to Create Custom Hooks?

### ✅ Good Use Cases:
1. **Shared logic** between components (like our filters!)
2. **Complex stateful logic** (multiple useState, useEffect)
3. **Reusable patterns** (form handling, API calls)

### ❌ Don't Overuse:
1. Simple one-time logic
2. UI-specific code (keep in component)
3. Just to make things shorter (no real benefit)

---

## Summary

**Custom Hook = Function that uses React hooks**

**Benefits:**
- 🧹 Cleaner components
- ♻️ Reusable logic
- 🧪 Easier testing
- 🛠️ Easier maintenance

**Our hook:**
```typescript
useEventFilters(events, searchValue)
// Returns: filters, setFilters, filteredEvents, categories, count
```

**You already know these hooks:**
- `useState` - Manages filter state
- `useEffect` - Not used here
- `useContext` - Not used here
- `useMemo` - Caches expensive calculations

The custom hook just **combines them** in a reusable way! 🎉
