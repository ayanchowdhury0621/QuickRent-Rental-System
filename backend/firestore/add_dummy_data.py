import logging
import random
from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError
from haversine import haversine
import csv


# Function to read zipcodes and filter those within the radius of the given location
def read_zipcodes_within_radius(filename, reference_lat, reference_lon, radius_miles):
    with open(filename, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        valid_zipcodes = []
        for row in reader:
            lat, lon = float(row["LAT"]), float(row["LNG"])
            if (
                haversine((lat, lon), (reference_lat, reference_lon), unit="mi")
                <= radius_miles
            ):
                valid_zipcodes.append(row["ZIP"])
        return valid_zipcodes


# Function to clear the collection
def clear_collection(collection):
    for doc in collection.stream():
        try:
            doc.reference.delete()
            logging.info(f"Deleted document {doc.id}")
        except GoogleAPIError as e:
            logging.error(f"Error deleting document {doc.id}: {e}")


def add_dummy_data(num_items=10, clear_existing=False):
    db = firestore.Client()

    # Clear existing data if needed
    if clear_existing:
        clear_collection(db.collection("products"))

    products = generate_dummy_products(num_items)

    with open(
        "/Users/Ayan/QuickRent-Rental-System/backend/firestore/products.csv",
        mode="w",
        newline="",
    ) as file:
        fieldnames = ["id", "name", "category", "tags", "price", "location", "image"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for product in products:
            try:
                # Add product to Firestore
                db.collection("products").add(product)
                logging.info(f"Added product: {product}")

                # Write product to CSV
                writer.writerow(product)

            except GoogleAPIError as e:
                logging.error(f"Error adding product {product}: {e}")


# Function to generate dummy products
def clear_collection(collection):
    for doc in collection.stream():
        try:
            doc.reference.delete()
            logging.info(f"Deleted document {doc.id}")
        except GoogleAPIError as e:
            logging.error(f"Error deleting document {doc.id}: {e}")


def generate_dummy_products(num_items, valid_zipcodes):
    product_info = {
        "Laptop": {
            "categories": ["Electronics", "Study"],
            "tags": ["computer", "tech", "study"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/laptop.png",
        },
        "Textbook": {
            "categories": ["Study", "Books"],
            "tags": ["education", "learning", "coursebook"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/textbooks.png",
        },
        "Bicycle": {
            "categories": ["Transportation", "Sport"],
            "tags": ["bike", "cycling", "travel"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/bicycle.png",
        },
        "Guitar": {
            "categories": ["Music", "Leisure"],
            "tags": ["instrument", "music", "acoustic"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/guitar.png",
        },
        "Camera": {
            "categories": ["Electronics", "Photography"],
            "tags": ["photo", "tech", "gadget"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/camera.png",
        },
        "Projector": {
            "categories": ["Electronics", "Study"],
            "tags": ["presentation", "movie", "tech"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/projector.png",
        },
        "Headphones": {
            "categories": ["Electronics", "Music"],
            "tags": ["audio", "music", "tech"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/headphones.png",
        },
        "Desk Chair": {
            "categories": ["Furniture", "Home"],
            "tags": ["seat", "office", "study"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/chair.png",
        },
        "Hoodie": {
            "categories": ["Clothing", "Fashion"],
            "tags": ["wearable", "casual", "comfort"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/hoodie.png",
        },
        "Backpack": {
            "categories": ["Accessories", "Study"],
            "tags": ["bag", "storage", "travel"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/backpack.png",
        },
        "Portable Charger": {
            "categories": ["Electronics", "Travel"],
            "tags": ["battery", "tech", "gadget"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/charger.png",
        },
        "Tent": {
            "categories": ["Outdoor", "Camping"],
            "tags": ["camping", "shelter", "outdoor"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/tent.png",
        },
        "Board Game": {
            "categories": ["Leisure", "Games"],
            "tags": ["game", "fun", "group activity"],
            "image": "https://storage.cloud.google.com/quickrent_item_images/boargame.png",
        },
    }
    products = []

    ids = 0
    for _ in range(num_items):
        ids += 1
        name, info = random.choice(list(product_info.items()))
        category = random.choice(info["categories"])
        tags = info["tags"]
        price = random.randint(5, 50)
        zipcode = random.choice(valid_zipcodes)
        id = ids

        products.append(
            {
                "id": id,
                "name": f"{name} {random.randint(1, 100)}",
                "category": category,
                "tags": tags,
                "price": price,
                "location": zipcode,
                "image": info["image"],
            }
        )

    return products


def add_dummy_data(num_items, writer, clear_existing=False):
    db = firestore.Client()

    # Clear existing data if needed
    if clear_existing:
        clear_collection(db.collection("products"))

    valid_zipcodes = read_zipcodes_within_radius(
        "zipcodes.csv", 40.0150, -105.2705, 100
    )

    products = generate_dummy_products(num_items, valid_zipcodes)

    for product in products:
        try:
            # Add product to Firestore
            db.collection("products").add(product)
            logging.info(f"Added product: {product}")

            # Write product to CSV
            writer.writerow(product)

        except GoogleAPIError as e:
            logging.error(f"Error adding product {product}: {e}")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Open a CSV file to write the products to
    with open(
        "/Users/Ayan/QuickRent-Rental-System/backend/firestore/products.csv",
        mode="w",
        newline="",
    ) as file:
        fieldnames = ["id", "name", "category", "tags", "price", "location", "image"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        add_dummy_data(50, writer, True)
