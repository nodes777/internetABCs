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
    //console.log(results);

    results.forEach(function(item, index, arr){
    	//console.log(item.Heading);
      /* Get the HTML elements needed */
      var linkID = item.Heading.toLowerCase();
    	var spanID = item.Heading.toLowerCase()+"Text";
    	var spanTag = document.getElementById(spanID);
      var linkTag = document.getElementById(linkID);

      /* Check for second item, fails on "t" */
      if( item.RelatedTopics[1] !== undefined){
        
        var text = item.RelatedTopics[1].Text;
        var url = item.RelatedTopics[1].FirstURL;
        var imgUrl = item.RelatedTopics[1].Icon.URL;
        // console.log(text +" : "+ url)
      } else {
        
        var text = item.RelatedTopics[0].Text;
        var url = item.RelatedTopics[0].FirstURL;
        var imgUrl = item.RelatedTopics[0].Icon.URL;

        // console.log(text +" : "+ url)
      }
      console.log(text);

      (function(text, url, imgUrl){
        /* Add image to HTML */
        addImage(imgUrl,text, index);
        /* Add text to the html*/
        addText(spanTag, text);
        /* Add link to the a tag in the html*/
        addLink(linkTag, url, text, linkID, index);
      })(text, url, imgUrl);

    });

});
function addText(spanTag, text){
    var firstWord = text.substr(0, text.indexOf(" "));
    spanTag.innerHTML = firstWord;
}
function addLink(linkTag, url, text, linkID, index){
        var firstWord = text.substr(0, text.indexOf(" "))+index;
        console.log(firstWord);
        imgID = firstWord+"img";
        linkTag.href = url;
        imgTag = document.getElementById(imgID);


  (function(imgTag) {
       linkTag.addEventListener("mouseover", function(){
            // some images don't exist...
            console.log(imgTag);
            imgTag.style.display = "inline";
        });

        linkTag.addEventListener("mouseleave", function(){
            imgTag.style.display = "none";
        });
  })(imgTag);
}

function addImage(imgUrl, text, index){
      var firstWord = text.substr(0, text.indexOf(" "))+index;
      console.log(firstWord);
      var node = document.createElement("IMG");
      node.src = imgUrl;
      node.id = firstWord+"img";
      document.getElementById("imageContainer").appendChild(node);
      node.style.display = "none";
}



// "http://www.faroo.com/api?q=+"letter"+&start=1&length=10&l=en&src=web&f=json&jsoncallback=mycallback"
// https://stackoverflow.com/questions/24705401/jquery-ajax-with-array-of-urls