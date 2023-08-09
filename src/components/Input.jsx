export function Input({ setKey, setMessage }) {
    const handleInput = () => {
        const inputKey = document.getElementById('key').value
        const inputMessage = document.getElementById('message').value

        setKey(inputKey)
        setMessage(inputMessage)
    }

    return (
        <div className='flex flex-row w-2/4 gap-3 justify-center'>
            <div className='flex flex-col'>
                <label htmlFor='key' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Key</label>
                <input id='key' type='text' onChange={() => handleInput()} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue='Secret key' required />
            </div>
            <div className='flex flex-col flex-grow'>
                <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Message</label>
                <input id='message' type='text' onChange={() => handleInput()} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue='Este es un mensaje para calcular HMAC con SHA256' required />
            </div>
        </div>
    )
}