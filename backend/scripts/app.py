import os
from flask import Flask, jsonify
from flask_cors import CORS
from influxdb import InfluxDBClient

app = Flask(__name__)
CORS(app)  # Allow all origins

client = InfluxDBClient(
    host='localhost',
    port=8086,
    database='pi_readings',
    username='pi_user',
    password=os.getenv('INFLUXDB_PASSWORD')
)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/cpu_stats', methods=['GET'])
def get_cpu_stats():
    # Query InfluxDB for the latest CPU stats
    results = client.query('SELECT * FROM cpu_stats ORDER BY time DESC LIMIT 1')
    points = list(results.get_points())
    
    # Ensure there's data to return
    if points:
        return jsonify(points[0])  # Send the latest data point as JSON
    else:
        return jsonify({"error": "No data found"}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
