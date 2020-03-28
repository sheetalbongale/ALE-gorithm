#!/usr/bin/python3
#-*-coding utf-8-*-
from bs4 import BeautifulSoup, UnicodeDammit
from pprint import pprint
import pandas as pd

with open("C:/Users/Cathy/Desktop/project2_backup/breweries.html", "r", encoding="utf8") as f:
#with open("test.html","r") as f:
    content = f.read()
    soup = BeautifulSoup(content, 'html.parser')

brew_data = []

def get_text(tag):
    try:
        text = tag.text
        return text
    except AttributeError:
        text = None
        #print("No Value")
        return text

def get_zip(zip):
    try:
        zip = zip.select("div > p")[1]
        for span in zip('span'):
            span.decompose()
        extract_zip = zip.text.strip(', ').replace(" ", "").replace("\n","")
        return extract_zip

    except Exception:
        extract_zip = None
        return extract_zip

divs = soup.find_all("div", attrs = {"class":"company-content"})


# #print(len(divs))
# for i in range(len(divs)):
#     brew_dict = {
#     'name' : get_text(divs[i].find('h3', attrs={"class":"with-mini-hr", "itemprop":"name"})),
#     'street' : get_text(divs[i].find('p', attrs = {"class":"alt mb-0",  "itemprop":"streetAddress"})),
#     'locality' : get_text(divs[i].find('span', attrs = {"itemprop":"addressLocality"})),
#     'region' : get_text(divs[i].find('span', attrs = {"itemprop":"addressRegion"})),
#     'phone': get_text(divs[i].find('span', attrs = {"itemprop":"telephone"})),
#     'zip_code': get_zip(divs[i].find("div", attrs={"itemprop":"address"})),
#     'full_address1': 
#     }
#     brew_data.append(brew_dict)
# print(brew_data)
# print(len(brew_data))
# df = pd.DataFrame(brew_data)
# df.to_excel("brewery_addresses.xlsx")