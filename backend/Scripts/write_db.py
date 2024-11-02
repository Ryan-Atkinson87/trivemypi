from influxdb import InfluxDBClient
from datetime import datetime
import pytz
import os
import pi_stats

uk_tz = pytz.timezone('Europe/London')
current_uk_time = datetime.now(uk_tz)

client = InfluxDBClient(
    host='localhost',
    port=8086,
    database='pi_readings',
    username='pi_user',
    password=os.getenv('INFLUXDB_PASSWORD')
)

def log_stats():
    """
    Logs CPU usage, CPU temperature, and memory usage to InfluxDB
    """
    # Get readings
    cpu_usage = pi_stats.get_cpu_usage()
    cpu_temp = pi_stats.get_cpu_temp()
    memory_pcnt = pi_stats.get_pcnt_memory()

    # Format the data for InfluxDB
    data = []

    # Log each CPU core's usage separately
    for idx, usage in enumerate(cpu_usage):
        data.append({
            "measurement": "cpu_stats",
            "tags": {
                "host": "raspberry_pi",
                "core": f"core_{idx}"  # Tagging each core
            },
            "time": current_uk_time.isoformat(),
            "fields": {
                "cpu_usage": usage,  # Each core's usage
                "cpu_temp": cpu_temp,
                "memory_pcnt": memory_pcnt
            }
        })

    # Write data to InfluxDB
    client.write_points(data)
    print("Logged data:", data)

# Example: Log data every 5 seconds (for continuous logging)
if __name__ == "__main__":
    import time
    try:
        while True:
            log_stats()
            time.sleep(5)  # Log every 5 seconds
    except KeyboardInterrupt:
        print("Stopped logging to InfluxDB")