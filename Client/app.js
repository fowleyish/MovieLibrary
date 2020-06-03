(function($){
    function processFormPost( e ){
        var dict = {
        	Title : this["movieTitle"].value,
            Director: this["movieDirector"].value,
            Genre: this["movieGenre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

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
                    $('#returnTable').append( `<tr><td>${data[index].title}</td><td>${data[index].genre}</td><td>${data[index].director}</td><td><button class="updateBtn" onclick="invokeUpdateForm(${data[index].movieId})">Update</button></td><td><button class="deleteBtn" onclick="deleteMovie(${data[index].movieId})">Delete</button></td></tr>` );
                })
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#moviesForm').submit( processFormPost );
    $('#submitGetAll').click( getAllValues );
})(jQuery);