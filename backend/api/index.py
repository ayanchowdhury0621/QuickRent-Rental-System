from flask import Flask, request, jsonify
from backend.storage.index import query_products, fetch_transaction_history
from flask_cors import CORS
from backend.Search import analyze_text
from google.cloud import bigquery

app = Flask(__name__)

# Initialize a BigQuery client
bigquery_client = bigquery.Client()
CORS(app)


@app.route("/search", methods=["POST"])
def search():
    search_query = request.json["query"]
    entities = analyze_text(search_query)
    results = query_products(entities)
    return jsonify(results)


@app.route("/transaction-history", methods=["GET"])
def transaction_history():
    try:
        transactions = fetch_transaction_history(
            limit=10
        )  # You can adjust the limit as needed
        return jsonify(transactions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# More API endpoints...

if __name__ == "__main__":
    app.run(debug=True, port=5008)
