import AsyncCreatableSelect from 'react-select/async-creatable';

// loadOptions is an array of objects that looks like [{label: 'CS35l', value: 'cs35l'}, {...}, {...}, ...]
export function Dropdown({ loadOptions, onChange }) {
    return (
        <AsyncCreatableSelect cacheOptions defaultOptions loadOptions={loadOptions} onChange={onChange}/>
    )
}