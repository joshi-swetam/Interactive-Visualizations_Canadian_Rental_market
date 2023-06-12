from flask import Flask, render_template, jsonify
from pymongo import MongoClient

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET'])
def get_data():
    client = MongoClient("mongodb+srv://SakshiDalal:Password546@project3.yny9jap.mongodb.net/")
    db = client['rental_data']
    collection = db['canadian_rental_market']
    data = list(collection.find({}))
    for item in data:
        item["_id"] = str(item["_id"])
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True)

