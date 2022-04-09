from imdb import Cinemagoer
import requests
from bs4 import BeautifulSoup
import json

imdb = Cinemagoer()

# Function scrapes IMDb using IMDb ID 'tt0107290' to find movie's poser.
# Function modified and based on https://github.com/tomkeith/imdb-scraper
def imdb_scrape_poster(imdb_id):
    imdb_base_url = 'https://www.imdb.com/title/'
    # Main content - build URL, and soup content
    imdb_full_url = imdb_base_url + imdb_id
    r = requests.get(imdb_full_url).content
    soup = BeautifulSoup(r, 'html.parser')
    
    # Code from js section has json variables
    json_dict = json.loads( str( soup.findAll('script', {'type':'application/ld+json'})[0].text ))

    # Grab movie poster url
    imdb_img_url = json_dict['image']
    
    return imdb_img_url

# Pre-Load movie dictionairy
top_films = imdb.get_top250_movies()
shawshank = imdb.get_movie(top_films[0].movieID)
# f = open("top250.py", "a")
# f.write("top250 = {")
# # Very slow to load all 250 url's, just grabbing first 25 for now
# for movie in range(5):
#     # Add poster to each film, format movieID with 'tt' in front
#     top_films[movie]['cover url'] = imdb_scrape_poster(f'tt{top_films[movie].movieID}')
# f.write()
print(top_films)