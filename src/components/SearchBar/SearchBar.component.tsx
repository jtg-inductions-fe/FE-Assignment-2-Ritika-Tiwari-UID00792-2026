import React, { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    onSearch,
}) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

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
};
