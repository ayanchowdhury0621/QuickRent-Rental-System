# backend/api/index.py
from flask import Flask, request
from flask_cors import CORS  # Import CORS
from backend.firestore.index import query_products
from backend.search.Search import analyze_text  # Ensure correct import path
import logging

app = Flask(__name__)
CORS(app, resources={r"/search": {"origins": "http://localhost:3000"}})


# At the beginning of your Flask app
logging.basicConfig(level=logging.DEBUG)


@app.route("/search", methods=["POST"])
def search():
    data = request.json
    search_query = data["query"]
    user_location = data["location"]  # Expecting location to be passed in

    entities = analyze_text(search_query)
    results = query_products(entities, user_location)
    return {"results": results}


# More API endpoints...

if __name__ == "__main__":
    app.run(debug=True)
