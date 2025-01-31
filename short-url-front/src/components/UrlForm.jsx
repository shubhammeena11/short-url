
import React, { useContext, useState } from 'react';
import { PortContext } from '../PortContext';

function UrlForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
   const port = useContext(PortContext)  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://short-url-ccp0.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      setShortUrl(`http://localhost:${port}/redirect/${data.id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center'>

    <div  className='flex justify-center items-center flex-col'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className= 'border-b-2 focus:outline-1 rounded-sm p-1.5 mr-10'
        />
        <button type="submit" className="text-blue-950 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Shorten</button>
      </form>
      {shortUrl && (
        <div className='flex md:flex-row flex-col justify-center text-sm items-center break-words '>
          <p className='underline'>SHORT URL :</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {` ${shortUrl}`}
          </a>
        </div>
      )}
    </div>
    </div>
  );
}

export default UrlForm;
