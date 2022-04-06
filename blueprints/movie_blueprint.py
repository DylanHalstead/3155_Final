from flask import Blueprint, abort, redirect, render_template, request
from src.models import db
from datetime import datetime

from imdb import Cinemagoer
imdb = Cinemagoer()

router = Blueprint('movie_router', __name__, url_prefix='/movies')

import requests
from bs4 import BeautifulSoup
import json
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

@router.get('/top-films')
def all_movies():
    top_films = imdb.get_top250_movies()
    for movie in range(20):
        # Add poster to each film, format movieID with 'tt' in front
        top_films[movie]['cover url'] = imdb_scrape_poster(f'tt{top_films[movie].movieID}')
    return render_template('all_movies.html', top_films=top_films)