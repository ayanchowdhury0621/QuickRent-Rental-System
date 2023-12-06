# backend/firestore/index.py
from google.cloud import firestore


def add_dummy_data():
    db = firestore.Client()
    # Define your dummy data
    products = [
        # ... Your dummy products
    ]

    for product in products:
        db.collection("products").add(product)


def query_products(search_criteria):
    # Logic to query Firestore based on search criteria
    # ...
    return results
