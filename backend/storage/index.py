from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError
import logging
from haversine import haversine
import csv

logging.basicConfig(level=logging.DEBUG)


def load_zipcode_data(csv_file):
    zipcode_data = {}
    with open(csv_file, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            zipcode_data[row["ZIP"]] = (float(row["LAT"]), float(row["LNG"]))
    return zipcode_data


# Assuming you have a dictionary called `zipcode_data` from Step 1
def calculate_distance(zipcode1, zipcode2):
    zipcode_data = load_zipcode_data(
        "/Users/Ayan/QuickRent-Rental-System/backend/firestore/zipcodes.csv"
    )

    coords1 = zipcode_data.get(zipcode1)
    coords2 = zipcode_data.get(zipcode2)
    if not coords1 or not coords2:
        # Handle the case where we don't have coordinates for a zipcode
        return float("inf")  # Represents an infinite distance
    return haversine(coords1, coords2)


def query_products(search_criteria, user_zipcode):
    db = firestore.Client()
    results = []

    zipcode_data = load_zipcode_data(
        "/Users/Ayan/QuickRent-Rental-System/backend/firestore/zipcodes.csv"
    )

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
                product["distance"] = calculate_distance(
                    user_zipcode, product_zipcode, zipcode_data
                )
                results.append(product)

    # Sort results by distance
    results.sort(key=lambda x: x["distance"])
    logging.debug(f"Total matches sorted by proximity: {len(results)}")
    return results


def fetch_popular_products(limit=4):
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


from google.cloud import bigquery


def fetch_transaction_history(limit=10):
    client = bigquery.Client()

    query = """
    SELECT * FROM sold_products_warehouse.sold_products
    LIMIT 5
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[bigquery.ScalarQueryParameter("limit", "INT64", limit)]
    )

    try:
        query_job = client.query(query, job_config=job_config)  # Make an API request
        results = query_job.result()  # Wait for the job to complete

        return [dict(row) for row in results]
    except Exception as e:
        logging.error(f"Error fetching transaction history: {e}")
        return []
