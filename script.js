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
        results.push(JSON.parse(arguments[i][0]));
    }

    // all data is now in the results array in order
    console.log(results);

    results.forEach(function(item, index, arr){
    	console.log(item.Heading);
      var linkID =item.Heading.toLowerCase();
    	var spanID = item.Heading.toLowerCase()+"Text";
    	var spanTag = document.getElementById(spanID);
      var linkTag = document.getElementById(linkID);

      if( item.RelatedTopics[1] !== undefined){
        
        var text = item.RelatedTopics[1].Text;
        var url = item.RelatedTopics[1].FirstURL;
        console.log(text +" : "+ url)
      } else {
        
        var text = item.RelatedTopics[0].Text;
        var url = item.RelatedTopics[0].FirstURL;

        console.log(text +" : "+ url)
      }
      
      //console.log(text);

      var firstWord = text.substr(0, text.indexOf(" "));

      spanTag.innerHTML = firstWord;

      linkTag.href = url;
    	
    });

});
