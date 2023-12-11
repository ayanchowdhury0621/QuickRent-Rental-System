from google.cloud import language_v1
from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError
import logging
from math import radians, cos, sin, asin, sqrt

logging.basicConfig(level=logging.DEBUG)


def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance in kilometers between two points
    on the earth (specified in decimal degrees).
    """
    # Convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers
    return c * r


def query_products(search_criteria, user_location, max_distance_km=10000):
    """
    Query products based on search criteria and user location.
    Only returns products within 'max_distance_km' from the user.
    """
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
            product_location = product.get("location", {})

            # Check if product matches search criteria
            if entity_name in product_name or entity_name in product_tags:
                # Calculate distance from user location
                product_lat = product_location.get("lat")
                product_lon = product_location.get("lon")
                if product_lat is not None and product_lon is not None:
                    distance = haversine(
                        user_location["lon"],
                        user_location["lat"],
                        product_lon,
                        product_lat,
                    )
                    # Check if product is within the specified distance
                    if distance <= max_distance_km:
                        results.append(product)
                        logging.debug(f"Match found within distance: {product}")

    logging.debug(f"Total matches: {len(results)}")
    return results
