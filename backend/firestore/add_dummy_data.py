import logging
import random
from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError


def add_dummy_data(num_items=10, clear_existing=False):
    db = firestore.Client()

    # Clear existing data if needed
    if clear_existing:
        clear_collection(db.collection("products"))

    products = generate_dummy_products(num_items)

    for product in products:
        try:
            db.collection("products").add(product)
            logging.info(f"Added product: {product}")
        except GoogleAPIError as e:
            logging.error(f"Error adding product {product}: {e}")


def clear_collection(collection):
    for doc in collection.stream():
        try:
            doc.reference.delete()
            logging.info(f"Deleted document {doc.id}")
        except GoogleAPIError as e:
            logging.error(f"Error deleting document {doc.id}: {e}")


def generate_dummy_products(num_items):
    product_info = {
        "Laptop": {
            "categories": ["Electronics", "Study"],
            "tags": ["computer", "tech", "study"],
        },
        "Textbook": {
            "categories": ["Study", "Books"],
            "tags": ["education", "learning", "coursebook"],
        },
        "Bicycle": {
            "categories": ["Transportation", "Sport"],
            "tags": ["bike", "cycling", "travel"],
        },
        "Guitar": {
            "categories": ["Music", "Leisure"],
            "tags": ["instrument", "music", "acoustic"],
        },
        "Camera": {
            "categories": ["Electronics", "Photography"],
            "tags": ["photo", "tech", "gadget"],
        },
        "Projector": {
            "categories": ["Electronics", "Study"],
            "tags": ["presentation", "movie", "tech"],
        },
        "Headphones": {
            "categories": ["Electronics", "Music"],
            "tags": ["audio", "music", "tech"],
        },
        "Microwave": {
            "categories": ["Appliances", "Home"],
            "tags": ["kitchen", "cooking", "food"],
        },
        "Desk Chair": {
            "categories": ["Furniture", "Home"],
            "tags": ["seat", "office", "study"],
        },
        "Hoodie": {
            "categories": ["Clothing", "Fashion"],
            "tags": ["wearable", "casual", "comfort"],
        },
        "Yoga Mat": {
            "categories": ["Sport", "Fitness"],
            "tags": ["exercise", "yoga", "workout"],
        },
        "Backpack": {
            "categories": ["Accessories", "Study"],
            "tags": ["bag", "storage", "travel"],
        },
        "Portable Charger": {
            "categories": ["Electronics", "Travel"],
            "tags": ["battery", "tech", "gadget"],
        },
        "Tent": {
            "categories": ["Outdoor", "Camping"],
            "tags": ["camping", "shelter", "outdoor"],
        },
        "Board Game": {
            "categories": ["Leisure", "Games"],
            "tags": ["game", "fun", "group activity"],
        },
    }
    products = []

    for _ in range(num_items):
        name, info = random.choice(list(product_info.items()))
        category = random.choice(info["categories"])
        tags = info["tags"]
        price = random.randint(5, 50)  # Random price between 5 and 50
        latitude = random.uniform(-90, 90)  # Random latitude
        longitude = random.uniform(-180, 180)  # Random longitude
        products.append(
            {
                "name": f"{name} {random.randint(1, 100)}",  # Adding a unique number to the name
                "category": category,
                "tags": tags,
                "price": price,
                "location": {"lat": latitude, "lon": longitude},
            }
        )

    return products


if __name__ == "__main__":
    import argparse

    logging.basicConfig(level=logging.INFO)

    parser = argparse.ArgumentParser(description="Populate Firestore with dummy data.")
    parser.add_argument(
        "--num", type=int, default=10, help="Number of dummy items to create"
    )
    parser.add_argument(
        "--clear", action="store_true", help="Clear existing data before adding"
    )

    args = parser.parse_args()

    add_dummy_data(num_items=args.num, clear_existing=args.clear)
