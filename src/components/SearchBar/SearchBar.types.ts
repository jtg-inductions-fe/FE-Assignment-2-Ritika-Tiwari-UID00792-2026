/** Interface defining the types of properties, search bar component can take. */
export interface SearchBarProps {
    /** placeholder stores the input or search query. */
    placeholder?: string;
    /** Callback handle the searching functionality. */
    onSearch: (value: string) => void;
}
