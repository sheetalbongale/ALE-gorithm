from pymongo import MongoClient
import googlemaps
import json
import pandas as pd
from pprint import pprint
import config
from datetime import datetime

client = MongoClient("mongodb://localhost:27017")
db = client.breweries

df = pd.read_excel("brew_list3.xlsx")
brewery_list = df["name"]
gmaps = googlemaps.Client(key=config.api)
for brewery in brewery_list:
    try:
        # print("hi")
        result = gmaps.find_place(brewery, "textquery")
        print("findplace_time:" + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
        # print("ok")
        # print(result.status_code)
        place_id = result["candidates"][0]["place_id"]
        data = gmaps.place(place_id)
        print("place_time:" + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
        # print("alright")
        posts = db.posts
        post_data = {
            "name": brewery,
            "address": data["result"]["formatted_address"]
            if data["result"]["formatted_address"]
            else "None",
            "phone": data["result"]["formatted_phone_number"]
            if data["result"]["formatted_phone_number"]
            else "None",
            "latitude": data["result"]["geometry"]["location"]["lat"]
            if data["result"]["geometry"]["location"]["lat"]
            else "None",
            "longitude": data["result"]["geometry"]["location"]["lng"]
            if data["result"]["geometry"]["location"]["lng"]
            else "None",
        }
        result = posts.insert_one(post_data)
        print("post_time:" + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
        print("One post: {0}".format(result.inserted_id))

    except Exception as e:
        pass
