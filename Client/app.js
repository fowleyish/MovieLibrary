(function($){
    function processFormPost( e ){
        var dict = {
        	Title : this["movieTitle"].value,
            Director: this["movieDirector"].value,
            Genre: this["movieGenre"].value
        };

        if (dict.Title != '') {
            $.ajax({
                url: 'https://localhost:44325/api/movie',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(dict),
                success: function( ){
                    getAllValues(e);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
        }

        e.preventDefault();
    }

    function getAllValues( e ){
        $('#response pre').html('');
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data ){
                $('#response pre').html('<hr /><table id="returnTable"><tr id="headingRow"><th>Title</th><th>Genre</th><th>Director</th><th></th><th></th></table>');
                $.each(data, function( index ) {
                    $('#returnTable').append( `<tr><td>${data[index].title}</td><td>${data[index].genre}</td><td>${data[index].director}</td><td><button class="updateBtn" value="${data[index].movieId}">Update</button></td><td><button class="deleteBtn" value="${data[index].movieId}">Delete</button></td></tr>` );
                })
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    function deleteMovie( e ) {
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + this.value,
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            success: function ( data ){
                getAllValues(e);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        
        e.preventDefault();
    }

    function updateMovie(data) {
        var dict = {
        	Title : data.title,
            Director: data.director,
            Genre: data.genre,
            Id: data.movieId
        };

        $('#editForm').html('');
        $('#editForm').html(`<h3>Update ${dict.Title}</h3><form id="editFormFields"><section id="movieTitleSectionEdit" class="formSection"> <label for="movieTitleInputEdit">Title</label> <input type="text" name="movieTitleEdit" id="movieTitleInputEdit" value="${dict.Title}" placeholder="Enter a movie title"/> </section> <section id="movieGenreSectionEdit" class="formSection"> <label for="movieGenreInputEdit">Genre</label> <input type="text" name="movieGenreEdit" id="movieGenreInputEdit" value="${dict.Genre}" placeholder="Enter a genre"/> </section> <section id="movieDirectorSectionEdit" class="formSection"> <label for="movieDirectorInputEdit">Director</label> <input type="text" name="movieDirectorEdit" id="movieDirectorInputEdit" value="${dict.Director}" placeholder="Enter a director's name"/> </section> <section id="submitButtonsSectionEdit" class="formSection"> <input type="hidden" value="${dict.Id}" id="hiddenEditId" /><input type="submit" id="submitEdit" value="Update"/> </section></form>`)
    }

    $('#response pre').on('click', '.updateBtn', this.value, function getSingleMovieForUpdate( e ) {
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + this.value,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data ) {
                updateMovie(data);
            }
        })
    });


    $('#editForm').on('click', '#submitEdit', function updateMoviePut( e ) {
        var dict = {
        	Title : $('#movieTitleInputEdit').val(),
            Director: $('#movieDirectorInputEdit').val(),
            Genre: $('#movieGenreInputEdit').val(),
            MovieId: parseInt($('#hiddenEditId').val(), 10)
        };

        if (dict.Title != '') {
            $.ajax({
                url: 'https://localhost:44325/api/movie/',
                dataType: 'json',
                type: 'put',
                contentType: 'application/json',
                data: JSON.stringify(dict),
                success: function( ){
                    $('#editForm').html('');
                    getAllValues(e);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
        }

        e.preventDefault();
    });


    $('#response pre').on('click', '.deleteBtn', deleteMovie);
    $('#moviesForm').submit( processFormPost );
    $('#submitGetAll').click( getAllValues );
})(jQuery);