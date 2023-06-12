from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # we add this

app = Flask(__name__)
CORS(app)  # we add this

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET'])
def get_data():
    client = MongoClient("mongodb+srv://SakshiDalal:Password546@project3.yny9jap.mongodb.net/")
    db = client['rental_data']  # database name
    collection = db['canadian_rental_market']  # collection name
    data = list(collection.find({}))
    for item in data:
        item["_id"] = str(item["_id"])  # Convert ObjectIDs to strings
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True)


