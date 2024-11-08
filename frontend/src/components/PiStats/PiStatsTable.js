import { useEffect, useState } from 'react';

function PiStatsTable() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the API
  const fetchStats = () => {
    setLoading(true); // Show loading state
    fetch("http://localhost:8000/api/pi_stats")
      .then(response => response.json())
      .then(data => {
        setStats(data);
        setLoading(false); // Reset loading state
      })
      .catch(error => {
        console.error("Error fetching Pi stats:", error);
        setLoading(false);
      });
  };

  // Fetch stats initially on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Raspberry Pi Stats</h2>
      <div className='table-container'>
        <button onClick={fetchStats} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Table"}
        </button>
        <table>
          <tbody>
            <tr>
              <td>CPU1 Usage</td>
              <td>{stats.CPU1_usage}%</td>
            </tr>
            <tr>
              <td>CPU2 Usage</td>
              <td>{stats.CPU2_usage}%</td>
            </tr>
            <tr>
              <td>CPU3 Usage</td>
              <td>{stats.CPU3_usage}%</td>
            </tr>
            <tr>
              <td>CPU4 Usage</td>
              <td>{stats.CPU4_usage}%</td>
            </tr>
            <tr>
              <td>CPU Temperature</td>
              <td>{stats.CPU_temperature}°C</td>
            </tr>
            <tr>
              <td>CPU Frequency</td>
              <td>{stats.CPU_frequency}GHz</td>
            </tr>
            <tr>
              <td>Total Memory</td>
              <td>{stats.Total_memory}GB</td>
            </tr>
            <tr>
              <td>Memory Usage</td>
              <td>{stats.Memory_usage}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>This table is showing stats for my Raspberry Pi</h3>
      <h4>Press the Refresh Table button to update to the current values</h4>
    </div>
  );
}

export default PiStatsTable;
