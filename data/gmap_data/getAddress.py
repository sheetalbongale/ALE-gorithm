import googlemaps
import json
from pprint import pprint
import pandas as pd
import config

df = pd.read_excel("breweries_address.xlsx")
brewery_list = df["name"]
brew_name = []
brew_address = []
brew_phone = []
brew_lat = []
brew_lng = []

gmaps = googlemaps.Client(key=config.api)
for brewery in brewery_list:
    try:
        #print(brewery)
        result = gmaps.find_place(brewery, 'textquery')
        place_id = result["candidates"][0]["place_id"]
        print(json.dumps(result))
        data = gmaps.place(place_id)
        #pprint(json.dumps(address, indent= 2))
        address = data["result"]["formatted_address"] if data["result"]["formatted_address"] else "None"
        phone = data["result"]["formatted_phone_number"] if data["result"]["formatted_phone_number"] else "None"
        lat = data["result"]["geometry"]["location"]["lat"] if data["result"]["geometry"]["location"]["lat"] else "None"
        lng = data["result"]["geometry"]["location"]["lng"] if data["result"]["geometry"]["location"]["lng"] else "None"
        brew_name.append(brewery)
        brew_address.append(address)
        brew_phone.append(phone)
        brew_lat.append(lat)
        brew_lng.append(lng)
        print(address)

    except Exception as e:
        pass

    ##THIS PORTION IS BROKEN. Needs Fixing. I would suggest 
df2 = pd.DataFrame([brew_name, brew_address, brew_phone, brew_lat, brew_lng], columns=["name", "address", "phone", "latitude", "longitude"])
with ExcelWriter("brewery_data.xlsx") as writer:
    df2.to_excel(writer)