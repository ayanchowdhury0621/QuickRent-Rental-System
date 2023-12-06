# backend/search/search.py
from google.cloud import language_v1

def analyze_text(text):
    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    response = client.analyze_entities(document=document)
    
    # Extract and process entities from the response
    # ...
    return entities
