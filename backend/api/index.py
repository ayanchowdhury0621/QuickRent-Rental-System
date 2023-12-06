# backend/api/index.py
from flask import Flask, request
from backend.firestore.index import query_products
from backend.search.search import analyze_text

app = Flask(__name__)


@app.route("/search", methods=["POST"])
def search():
    search_query = request.json["query"]
    entities = analyze_text(search_query)
    # Use entities to query Firestore
    results = query_products(entities)
    return {"results": results}


# More API endpoints...

if __name__ == "__main__":
    app.run(debug=True)
