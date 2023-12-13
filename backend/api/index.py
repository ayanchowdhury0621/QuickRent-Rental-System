# backend/api/index.py
from flask import Flask, request
from flask_cors import CORS  # Import CORS
from backend.firestore.index import query_products
from backend.search.Search import analyze_text  # Ensure correct import path
from backend.firestore.index import fetch_popular_products

import logging

app = Flask(__name__)
CORS(app)


# At the beginning of your Flask app
logging.basicConfig(level=logging.DEBUG)


@app.route("/search", methods=["POST"])
def search():
    data = request.json
    search_query = data["query"]
    user_location = data["location"]  # Expecting location to be passed in
    print(user_location)

    entities = analyze_text(search_query)
    results = query_products(entities, user_location)
    return {"results": results}


@app.route("/popular-products", methods=["GET"])
def get_popular_products():
    try:
        products = fetch_popular_products()
        return {"products": products}
    except Exception as e:
        logging.error(f"Error fetching popular products: {e}")
        return {"error": "Error fetching popular products"}, 500


if __name__ == "__main__":
    app.run(debug=True)
