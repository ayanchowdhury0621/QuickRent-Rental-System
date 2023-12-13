from google.cloud import language_v1
import logging


def analyze_text(text):
    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )
    response = client.analyze_entities(document=document)

    entities = [
        {"name": entity.name, "type": entity.type} for entity in response.entities
    ]
    logging.debug(f"NLP API extracted entities: {entities}")
    return entities
