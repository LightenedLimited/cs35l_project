import AsyncCreatableSelect from 'react-select/async-creatable';

export function Dropdown(options){
    return (
        <AsyncCreatableSelect cacheOptions defaultOptions loadOptions={options} />
    )
}