# backend/firestore/index.py
from google.cloud import language_v1
from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError
import logging
from math import radians, cos, sin, asin, sqrt

logging.basicConfig(level=logging.DEBUG)

from google.cloud import firestore
import logging


# Mock function for calculating distance between zipcodes
def calculate_distance(zipcode1, zipcode2):
    # This should be replaced with actual logic to calculate distance
    return abs(int(zipcode1) - int(zipcode2))


def query_products(search_criteria, user_zipcode):
    db = firestore.Client()
    results = []

    for criteria in search_criteria:
        entity_name = criteria["name"].lower()
        query_ref = db.collection("products")
        snapshots = query_ref.stream()

        for snapshot in snapshots:
            product = snapshot.to_dict()
            product_name = product.get("name", "").lower()
            product_tags = [tag.lower() for tag in product.get("tags", [])]
            product_zipcode = product.get("location")

            if entity_name in product_name or entity_name in product_tags:
                # Append product with distance to results
                product["distance"] = calculate_distance(user_zipcode, product_zipcode)
                results.append(product)

    # Sort results by distance
    results.sort(key=lambda x: x["distance"])
    logging.debug(f"Total matches sorted by proximity: {len(results)}")
    return results


def fetch_popular_products(limit=100):
    """
    Fetch popular products from the Firestore database.
    Returns a limited number of products.
    """
    db = firestore.Client()
    query_ref = (
        db.collection("products")
        .order_by("name", direction=firestore.Query.DESCENDING)
        .limit(limit)
    )
    snapshots = query_ref.stream()

    popular_products = [snapshot.to_dict() for snapshot in snapshots]
    return popular_products
