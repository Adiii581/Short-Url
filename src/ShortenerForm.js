import React, { useState } from 'react';
import axios from 'axios';

function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShortUrl(null);
    setError(null);

    // This is the line that needs to be updated for deployment.
    // It will use the environment variable you set in Vercel.
    // When running locally, it will fall back to localhost:5000 if the variable isn't set.
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    try {
      const response = await axios.post(`${apiUrl}/api/shorten`, {
        url: url // This is the correct request body
      });
      setShortUrl(response.data.short_url);
    } catch (err) {
      setError('Could not shorten the URL. Please try again.');
      console.error('API Error:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h2>URL Shortener</h2>
        <div>
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Enter a long URL"
            style={{ width: '300px', padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white' }}>
            Shorten
          </button>
        </div>
      </form>

      {/* Display Results */}
      {shortUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default ShortenerForm;
