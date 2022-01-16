import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore
import os

from Graph import Graph

app = FastAPI()

# Firebase initialization
# Use the application default credentials
project_id = 'swopshop-7135f'
cred = credentials.Certificate('./firebasePrivateKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# origins = [
#    "http://localhost",
#    "http://localhost:8000",
#    "http://localhost:8080",
#    "http://localhost:8081",
#	"http://localhost:19001"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
async def Test():
    return "testing value"


@app.get("/get-user")
async def get_user(user_id: str):
    user_doc_ref = db.collection('users').document(user_id)
    user_doc = user_doc_ref.get()
    if user_doc.exists:
        user_doc = user_doc.to_dict()
        print(user_doc)
        return user_doc
    else:
        print("No such document!")
        return "Error"

@app.post("/swipe_right")
async def get_user(user_id: str, product_id: str):
    user = db.collection('users').document(user_id)
    user_data = user.get()

    if not user_data.exists:
        return []
    
    user_data = user_data.to_dict()
    if product_id in user_data.get('products', []):
        #cant swipe right on your own product
        return []
    
    want_list = user_data.get('want_list', [])
    want_list.append(product_id)
    user.update({"want": want_list})

    g = Graph(db)
    res = g.contains_cycle(product_id=product_id)
    print(res)
    g.destory_cycle(res)
    return res

@app.get("/test_dfs")
async def test_dfs(product_id: str):

    g = Graph(db)
    return g.contains_cycle(product_id=product_id)

@app.get("/get_products")
async def products(user_id: str):
    return [
        {"product_id": "asdlkfjakfa", "title": "Hello1", "price": "100", "image": "https://images.macrumors.com/t/ChPbcdmq7U5j6laUuR61rOjbh6g=/1600x0/article-new/2020/11/macbook-air-m1-unboxing.jpg"},
    {"product_id": "asdfadsffaj", "title": "Hello3", "price": "100", "image": "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/x/f/xfit_black-white01.jpg"},
    {"product_id": "sdheihewhij", "title": "Hello5", "price": "100", "image": "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/x/f/xfit_black-white01.jpg"}]

@app.post("/add_product")
async def add_product(user_id: str, image: str, product_name: str):
    return 0

@app.get("/get_swipe_products")
async def swipe_products(user_id: str):
    return [
    {"product_id": "GrAPM98SXEezkb6yRpBK", "title": "Hello3", "price": "100", "image": "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/x/f/xfit_black-white01.jpg"},
    {"product_id": "yUgG91kRoQ62KOHOio2h", "title": "Hello5", "price": "100", "image": "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/x/f/xfit_black-white01.jpg"},
        {"product_id": "john-prod", "title": "John", "price": "100", "image": "https://images.macrumors.com/t/ChPbcdmq7U5j6laUuR61rOjbh6g=/1600x0/article-new/2020/11/macbook-air-m1-unboxing.jpg"}]