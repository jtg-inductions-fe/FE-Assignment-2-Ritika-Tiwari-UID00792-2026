import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 1000) {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function clears the timer if the value or delay changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
