from flask import Flask, render_template, jsonify
import json, os

app = Flask(__name__)
# Load rides from the JSON file
def load_rides():
    # Using the full file path for 'rides.json'
    rides_file_path = os.getcwd()+'\\bh\\rides.json'
    with open(rides_file_path, 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index1.html')

@app.route('/select_zone/<zone>')
def select_zone(zone):
    return render_template('index2.html', zone=zone)

@app.route('/get_rides/<zone>', methods=['GET'])
def get_rides(zone):
    rides = load_rides()
    if zone in rides:
        return jsonify(rides[zone])
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)