import React, { useEffect, useState } from 'react';

const Analytic = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001');
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return <div className='flex justify-center h-56 items-center text-4xl'>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">URL Analytics</h1>
    <div className='table-container'>
      <table className="min-w-full bg-white text-sm sm:text-lg">
        <thead>
          <tr>
            <th className="py-2 border-b-blue-100 border-b-4">Short URL</th>
            <th className="py-2 border-b-blue-100 border-b-4">Original URL</th>
            <th className="py-2 border-b-blue-100 border-b-4">Clicks</th>
            <th className="py-2 border-b-blue-100 border-b-4 flex-1 hidden md:table-cell">Created At</th>
          </tr>
        </thead>
        <tbody className='min-w-full'>
          {analyticsData.map((item) => (
              <tr key={item._id}>
              <td className="py-2 text-center align-middle">
                <a
                  href={`http://localhost:8001/redirect/${item.shortId}`}
                  className="text-blue-500"
                  target="_blank"
                  >
                  {item.shortId}
                </a>
              </td>
              <td className="py-2 text-center">{item.redirectURL}</td>
              <td className="py-2 text-center align-middle">{item.visitHistory.length}</td>
              <td className="py-2 text-center align-middle hidden md:block">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Analytic;
