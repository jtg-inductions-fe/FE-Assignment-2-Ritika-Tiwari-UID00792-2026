import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { useDebounce } from '@hooks'; // Assuming your hook is here

import { SearchBarProps } from './SearchBar.types';

/**
 * SearchBar Component
 *
 * SearchBar gives the search textbox and handle the functionality of searching by input query.
 * @props SearchBarProps - configuration properties to show and handle the searching functionality.
 *
 */
export const SearchBar = React.memo(function SearchBar({
    placeholder = 'Search...',
    onSearch,
}: SearchBarProps) {
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    /** Function triggers when the input changes in the text field for query. */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    /** Handle clear functionality of the textfield . */
    const handleClear = () => {
        setQuery('');
    };
    /** Handle the typing query event for the search filed */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: query && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClear}
                                edge="end"
                                aria-label="clear search"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
});
