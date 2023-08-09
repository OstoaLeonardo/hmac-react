export function Item({ name, value }) {
    return (
        <div className='flex flex-row text-xl text-gray-700 dark:text-white'>
            <mark className='h-fit text-white bg-blue-500 rounded-lg px-2 py-1 mr-3'>
                <code>
                    {name}
                </code>
            </mark>
            <code className='whitespace-normal break-all'>
                {value}
            </code>
        </div>
    )
}