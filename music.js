// Put your Last.fm API key here
var api_key = "29c2c1148448d89af3fc011276ee2755";

function sendRequest () {
		
    
 
		var artist = encodeURI(document.getElementById("form-input").value);
		artistGetInfo(artist);
		artistGetalbum(artist);
		artistGetsimilar(artist);
}


function artistGetInfo(artist){
	   var method = "artist.getinfo";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);			
			//document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";// Raw output
			
			
			//FOR displaying image
			src = json.artist.image[2]["#text"];
			document.getElementById("output").innerHTML = '<img src="' + src + '" height = 380px />';
			
			var name = json.artist.name;
			document.getElementById("imagename").innerHTML = name;
			
			var link = json.artist.url;
			//document.getElementById("link").innerHTML = "<pre>" + link + "</pre>";
			document.getElementById("link").innerHTML = '<a href="' + link +'">Link to the artist ' +name +'</a>';
			
			
			var summary = json.artist.bio.summary;
			document.getElementById("summary").innerHTML = "" + summary + "";
			
									
        }
    };
    xhr.send(null);
}




function artistGetalbum(artist){
	   var method = "artist.getTopAlbums";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
			document.getElementById("table").innerHTML =" ";
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);			
			//document.getElementById("outputalbum").innerHTML = "<pre>" + str + "</pre>";	
			
			
			document.getElementById("title1").innerHTML = "Top 20 albums";
			for(x = 0 ; x < 20 ; x++)
			{
				
				src = json.topalbums.album[x].image[0]["#text"];
				
				if(src == "")
				{
					array = "image not available";
				}
				else				
					array = '<img src="' + src + '" width = 75px/>';
				
				document.getElementById("table").innerHTML +='<tr><td width="100px">'  	
														+ json.topalbums.album[x]["name"] + '</td><td width="100px">' +array +'</td></tr>';
			}
								
			
			}
							
    };
    xhr.send(null);
}




function artistGetsimilar(artist){
	   var method = "artist.getSimilar";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);		

			var array = ' ';
			for(x = 0 ; x < 20 ; x++)  // For iterating through entire list : (x in json.similarartists.artist)
			{
				array += "\n";
				array += json.similarartists.artist[x]["name"];
				array += "\n";
			
			}
			document.getElementById("title2").innerHTML = " Top 20 Similar Artists";
			document.getElementById("similaroutput").innerHTML = "<pre>" + array + "</pre>";	
			
					
        }
    };
    xhr.send(null);
}


