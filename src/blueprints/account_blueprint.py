from flask import Blueprint, abort, redirect, render_template, request, redirect
from src.models import Movie, UserRating, db, User, Post
from src.blueprints.movie_blueprint import get_rated_IDs
from datetime import datetime
from app import session
#from app import user

router = Blueprint('account_router', __name__)

@router.get('/<username>/posts')
def account_posts(username):
    
    if 'user' not in session:
        abort('/login')
    else:
        sessionUser = User.query.filter_by(user_id=session['user']['user_id']).first()
        posts = Post.query.filter_by(user_id=sessionUser.user_id).all()
        return render_template('account_posts.html', user=sessionUser, posts = posts)

@router.get('/<username>')
def account_page(username):
    if 'user' in session:
        if(not User.query.filter_by(username=username).first()):
            abort(404)
        user_page = User.query.filter_by(username=username).first()
        userWatchlisted = user_page.watchlistMovies
        posts = Post.query.filter_by(user_id=user_page.user_id).limit(2).all()
        ratedMovies = []
        for userRating in user_page.movie_rating:
            ratedMov = userRating.movie.to_dict()
            ratedMovies.append(ratedMov)
        watchlistedFilms = []
        for movie in range(len(userWatchlisted)):
            watchlistedFilms.append(userWatchlisted[movie].to_dict())
        ratedIDs = get_rated_IDs()
        return render_template('account.html', sessionUser=user_page, movies = watchlistedFilms, posts = posts, rated = ratedMovies, ratedIDs=ratedIDs)
    else:
        abort(403)

@router.get('/<username>/posts')
def account_posts_user(username):
    sessionUser = User.query.filter_by(username = username).first()
    print(sessionUser.username)
    posts = Post.query.filter_by(user_id=sessionUser.user_id).all()
    return render_template('account_posts.html', user=sessionUser, posts = posts)

@router.get('/<username>/edit')
def get_edit_account(username):
    return render_template("edit_account.html")

@router.post('/<username>/edit')
def edit_account(username):
    if 'user' in session:
        profilePhoto = request.form.get('profilePhoto')
        username = request.form.get('username')
        aboutMe = request.form.get('about')
        user = User.query.filter_by(email = session['user']['email']).first()
        if User.query.filter_by(username = username).count() > 0:
            return render_template('edit_account.html', error = f'{username} is not available')
        
        if username != '':
            user.username = username
        if profilePhoto != '':
            user.pfp = profilePhoto
        if aboutMe != '':
            user.about = aboutMe
            
        session['user'] = {
            'email': user.email,
            'username': user.username,
            'user_id': user.user_id,
            'pfp': user.pfp
        }
        db.session.commit()
        return redirect('/username')
    return redirect('/')

