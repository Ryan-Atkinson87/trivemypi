import os
from influxdb import InfluxDBClient

# Initialize client
client = InfluxDBClient(
    host='localhost',
    port=8086,
    database='pi_readings',
    username='pi_user',
    password=os.getenv('INFLUXDB_PASSWORD')
)

def write_cpu_temp(temp_value):
    json_body = [
        {
            "measurement": "cpu_temperature",
            "tags": {
                "device": "raspberry_pi"
            },
            "fields": {
                "value": temp_value
            }
        }
    ]
    client.write_points(json_body)


def get_recent_cpu_temps():
    result = client.query("SELECT value FROM cpu_temperature WHERE time > now() - 30m")
    return list(result.get_points())



