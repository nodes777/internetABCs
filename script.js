console.log("Start calling");

//make the alphabet as an array
var letters  = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Explain yourself Taylor
$.when.apply($, letters.map(function(letter) {
    return jQuery.ajax({
      type: 'GET',
      url: "http://api.duckduckgo.com/?",
      data: { q: letter, format: 'json', pretty: 1 },
      jsonpCallback: 'jsonp',
      //dataType: 'jsonp',
      success: function(res){console.log(letter+" worked");},
      error: function(err){console.log(letter+ " didnt work:"+ JSON.stringify(err));}
    });
})).done(function() {
    var results = [];
    // there will be one argument passed to this callback for each ajax call
    // each argument is of this form [data, statusText, jqXHR]
    for (var i = 0; i < arguments.length; i++) {
        results.push(arguments[i][0]);
    }

    // all data is now in the results array in order
    console.log(results);

});
