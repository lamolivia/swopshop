from itertools import product
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime
from typing import List

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

def get_user_from_product(product_id: str) -> str:

    product = db.collection('products').document(product_id)
    product = product.get()

    if not product.exists:
        return ''

    product = product.to_dict()
    return product.get('user_id', '')

def create_chat_rooms(cycle: List[str]) -> None:
    chat_ids = []
    match_entry = db.collection('matches').document()

    left = len(cycle) - 1
    right = 0
    curr_time = datetime.now()

    while right < len(cycle):
        curr_chat = db.collection('chatRooms').document()
        chat_ids.append(curr_chat.id)
        print(f"buyer is {cycle[left]} and seller is {cycle[right]}")
        curr_chat.set({
            "buyer_id": get_user_from_product(cycle[left]),
            "seller_id": get_user_from_product(cycle[right]),
            "prod_id": cycle[right],
            "match_id": match_entry.id,
            "last_message_time": curr_time
        })
        right += 1
        left = (left + 1) % len(cycle)

    match_entry.set({
        "match_time": curr_time,
        "expired": False,
        "chat_ids": chat_ids
    })

@app.get("/swipe_right")
async def swipe_right(user_id: str, product_id: str) -> List[str]:
    user = db.collection('users').document(user_id)
    user_data = user.get()

    if not user_data.exists:
        return []
    
    user_data = user_data.to_dict()
    if product_id in user_data.get('products', []):
        #cant swipe right on your own product
        return []
    
    want_list = user_data.get('want', [])
    want_list.append(product_id)
    user.update({"want": want_list})

    g = Graph(db)
    res = g.contains_cycle(user_id=user_id, product_id=product_id)
    print(res)

    #create chat room
    if len(res) > 1:
        # create entries in chatrooms
        create_chat_rooms(cycle=res)

    g.destory_cycle(res)
    return res


@app.get("/test_dfs")
async def test_dfs(user_id: str, product_id: str):

    g = Graph(db)
    res = g.contains_cycle(user_id=user_id, product_id=product_id)
    print(res)

    if len(res) > 1:
        # create entries in chatrooms
        create_chat_rooms(cycle=res)

    return res

@app.get("/get_products")
async def products(user_id: str) -> List[dict]:

    product_ref = db.collection('products')
    user_products = product_ref.where('user_id', '==', user_id)
    user_products = user_products.get()

    res = []
    for p in user_products:
        res.append({
            'user_id': p.get('user_id'),
            'name': p.get('name'),
            'image': p.get('image'),
            'price': p.get('price')
        })

    return res

@app.get("/add_product")
async def add_product(user_id: str, image: str, product_name: str, price: str):
    # get user stuff
    user = db.collection('users').document(user_id)
    user_data = user.get()

    if not user_data.exists:
        return 1

    new_products = user_data.to_dict().get('products', [])

    # create new product
    product = db.collection('products').document()
    product.set({
        'user_id': user_id,
        'image': image,
        'name': product_name,
        'price': price
    })

    # add product to user list
    new_products.append(product.id)
    user.update({
        "products": new_products
    })

    return 0


@app.get("/get_swipe_products")
async def swipe_products(user_id: str) -> List[dict]:
    product_ref = db.collection('products')
    user_products = product_ref.where('user_id', '!=', user_id).limit(10)
    user_products = user_products.get()

    res = []
    for p in user_products:
        res.append({
            'user_id': p.get('user_id'),
            'name': p.get('name'),
            'image': p.get('image'),
            'price': p.get('price'),
            'product_id': p.id
        })

    return res
