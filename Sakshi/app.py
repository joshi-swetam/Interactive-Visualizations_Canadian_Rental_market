from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    client = MongoClient("mongodb+srv://SakshiDalal:Password546@project3.yny9jap.mongodb.net/")
    db = client['rental_data']   # database name
    collection = db['canadian_rental_market']  # collection name
    data = list(collection.find({}))
    for item in data:
        item["_id"] = str(item["_id"])  # Convert ObjectIDs to strings
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True)
