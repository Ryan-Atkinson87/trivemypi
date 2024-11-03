from influxdb import InfluxDBClient
from datetime import datetime
import pytz
import os
import pi_stats

uk_tz = pytz.timezone("Europe/London")
current_uk_time = datetime.now(uk_tz)

# Initialise database client details
client = InfluxDBClient(
    host="localhost",
    port=8086,
    database="pi_readings",
    username="pi_user",
    password=os.getenv("INFLUXDB_PASSWORD"),
)


def getTime():
    """
    Sets the current uk time
    """
    global current_uk_time
    current_uk_time = datetime.now(uk_tz)


def log_stats():
    """
    Logs CPU usage per core, CPU temperature, and memory usage to InfluxDB
    """
    # Get readings
    cpu_usage = pi_stats.get_cpu_usage()
    cpu_temp = pi_stats.get_cpu_temp()
    memory_pcnt = pi_stats.get_pcnt_memory()

    cpu1_usage = cpu_usage[0]
    cpu2_usage = cpu_usage[1]
    cpu3_usage = cpu_usage[2]
    cpu4_usage = cpu_usage[3]

    # Format the data for InfluxDB
    data = [
        {
            "measurement": "cpu_stats",
            "tags": {"host": "raspberry_pi"},
            "time": current_uk_time.isoformat(),
            "fields": {
                "cpu1_usage": cpu1_usage,
                "cpu2_usage": cpu2_usage,
                "cpu3_usage": cpu3_usage,
                "cpu4_usage": cpu4_usage,
                "cpu_temp": cpu_temp,  # Single temperature reading
                "memory_pcnt": memory_pcnt,  # Single memory usage reading
            }
        }
    ]

    # Write data to InfluxDB
    client.write_points(data)
    print("Logged data:", data)


# Example: Log data every 5 seconds (for continuous logging)
if __name__ == "__main__":
    import time

    try:
        while True:
            getTime()
            log_stats()
            time.sleep(5)  # Log every 5 seconds
    except KeyboardInterrupt:
        print("Stopped logging to InfluxDB")
