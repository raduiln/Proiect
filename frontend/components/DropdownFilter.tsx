
interface SubjectFilter {
    id: number;
    name: string;
}
interface DropdownFilterProps {
    options: SubjectFilter[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    emptyStateMessage?: string;
    label: string;
}

export default function DropdownFilter( { options, onChange, value, emptyStateMessage, label}: DropdownFilterProps ) {
    return (
        <div>
            <label htmlFor="materieFilter" className='block mt-2 mr-3 text-sm font-medium text-gray-900'>{label}</label>
            <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2'
                id="materieFilter"
                onChange={onChange}
                value={value ?? ''}
            >
                <option value=''>Selecteaza</option>
                {options.length > 0 ? (
                    options.map((option) => (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    )
                ) ) : (
                    <option disabled value=''>{emptyStateMessage}</option>
                )}
                
            </select>
        </div>
    )
}
