let $ = function (selector) { return document.querySelector(selector); };
    document.addEventListener("DOMContentLoaded", async () => {
        let filteredMoviesRes = await fetch('/movies/top-250');
        let filteredMovies = await filteredMoviesRes.json();
        let pageNum = 1;
        await updateMovies(filteredMovies, pageNum);

        // Grab user's filter
        $(".filter-btn").addEventListener("click", async (evt) => {
            if(evt.target.id == 'best'){
                filteredMoviesRes = await fetch('/movies/top-250');
                filteredMovies = await filteredMoviesRes.json();
                await updateMovies(filteredMovies, pageNum);
            }
            if(evt.target.id == 'worst'){
                filteredMoviesRes = await fetch('/movies/bottom-100');
                filteredMovies = await filteredMoviesRes.json();
                await updateMovies(filteredMovies, pageNum);
            }
            if(evt.target.id == 'trending'){
                filteredMoviesRes = await fetch('/movies/trending');
                filteredMovies = await filteredMoviesRes.json();
                await updateMovies(filteredMovies, pageNum);
            }
            evt.preventDefault();
        });

        // Grab user's page
        // Tried wrapping this all into one function but I could not get it to work. Should be possible but not sure why it doesn't work :/
        $("#page-previous").addEventListener("click", async evt => {
            console.log(evt.target.id);
            if(pageNum > 1){
                pageNum -= 1;
                await updateMovies(filteredMovies, pageNum);
            }
            evt.preventDefault();
        });

        $("#page-one").addEventListener("click", async evt => {
            console.log(evt.target.id);
            pageNum = 1;
            await updateMovies(filteredMovies, pageNum);
            evt.preventDefault()
        });
        
        $("#page-two").addEventListener("click", async evt => {
            console.log(evt.target.id);
            pageNum = 2;
            await updateMovies(filteredMovies, pageNum);
            evt.preventDefault();
        });


        $("#page-three").addEventListener("click", async evt => {
            console.log(evt.target.id);
            pageNum = 3;
            await updateMovies(filteredMovies, pageNum);
            evt.preventDefault();
        });

        $("#page-next").addEventListener("focus", async evt => {
            console.log(evt.target.id);
            if(pageNum < filteredMovies.length/25){
                pageNum += 1;
                await updateMovies(filteredMovies, pageNum);
            }
            evt.preventDefault();
        });
    });

    // Function used to update movie filter and page
    function updateMovies(movieArray, pageNum){
        // Grab 25 films based on page we're on
        const startIndex = (pageNum-1)*25;
        const endIndex = pageNum*25;

        // Make sure we dont go out of bounds
        if(endIndex > movieArray.length-1)
        {
            endIndex = movieArray.length-1;
        }

        // Insert movie cards into table
        let rowNum = 0
        $(".movie-table").innerHTML = `<tr id="row-${rowNum}"></tr>`;
        for(let i = startIndex; i < endIndex; i++){
            $(`#row-${rowNum}`).innerHTML += `<td>
                <a href="/movies/${movieArray[i]['movie_id']}" class="movie-sm-link">
                    <div class="movie-sm">
                        <img class="movie-poster-sm" src="${movieArray[i]['poster_url']}"
                            alt="${movieArray[i]['title']}.jpg">
                        <div class="movie-card-sm">
                            <p class="movie-title-sm">${movieArray[i]['title']}</p>
                            <table class="movie-card-content-sm">
                                <tr class="card-ratings-sm">
                                    <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#00703C"
                                            class="bi bi-star star-uncc-sm" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                        </svg>
                                        <p class="uncc-rating-sm">${movieArray[i]['uncc_rating']}</p>
                                    </td>
                                    <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#B3A369"
                                            class="bi bi-star-fill star-imdb-sm" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <p class="imdb-rating-sm">${movieArray[i]['imdb_rating']}</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </a>
            </td>`;
            if(i%5 == 4){
                rowNum += 1;
                $(".movie-table").innerHTML += `<tr id="row-${rowNum}"></tr>`;
            }
        }
        $(".movie-table").innerHTML += `<tr>
            <td colspan="5">
                <!-- https://www.w3schools.com/css/tryit.asp?filename=trycss_ex_pagination -->
                <div class="custom-pagination">
                    <button id="page-previous" class="page-btn">&laquo;</button>
                    <button id="page-one" class="page-btn">1</button>
                    <button id="page-two" class="page-btn">2</button>
                    <button id="page-three" class="page-btn">3</button>
                    <button id="page-next" class="page-btn">&raquo;</button>
                </div>
            </td>
        </tr>`;
    }