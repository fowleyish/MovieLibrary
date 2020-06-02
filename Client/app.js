(function($){
    function processForm( e ){
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

    $('#moviesForm').submit( processForm );
})(jQuery);