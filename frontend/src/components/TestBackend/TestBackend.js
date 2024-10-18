import React, { useEffect, useState } from 'react';

const TestBackend = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default TestBackend;
