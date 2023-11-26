import AsyncCreatableSelect from 'react-select/async-creatable';

// loadOptions is an array of objects that looks like [{label: 'CS35l', value: 'cs35l'}, {...}, {...}, ...]
export function Dropdown({loadOptions}) {
    return (
        <AsyncCreatableSelect cacheOptions defaultOptions loadOptions={loadOptions} />
    )
}














// // takes an array of strings representing options and renders them
// export async function Dropdown({optionsFunc}){
//     return (
//         <AsyncCreatableSelect cacheOptions loadOptions={formatOptions} />
//     )
// }

// // formats an array of string options to something react-select can use
// // something like ['Red', 'Blue'] would become [ {value: 'red', label: 'Red'}, {value: 'blue', label: 'Blue'}]
// const formatOptions = async (getOptions) => {

//     await delay(1000) // delete
//     let bareClasses = ['CS35L', 'MATH 33A', 'MATH 61', 'MATH 32B', 'PHYSICS 1A', 'CS 33', 'MATH 32A', 'LING 127', 'CS 32'].sort()
//     const formatted = []
//     for (const i of bareClasses){
//         formatted.append({label: i, value: i.toLowerCase()})
//     }
//     return formatted
//     // const options = {label: 'cs35l', value: 'cs35l'}
//     // console.log(options)
//     // const formattedOptions = []
//     // for (const i of options){
//     //     if (typeof(i) !== 'string'){ i = JSON.stringify(i) }
//     //     formattedOptions.append({value: i.toLowerCase(), label: i})
//     // }
//     // console.log('formatted', formattedOptions)
//     // return formattedOptions
// }


// // delete! for testing
// function delay(ms){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
