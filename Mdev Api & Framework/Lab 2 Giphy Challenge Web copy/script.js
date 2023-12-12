fetch('https://api.giphy.com/v1/gifs/random?api_key=r16lM1c8AR8J7W0mnrixp2xKeuU8UCcl&tag=funny+dog&rating=g')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log(jsonData);
        var gifUrl = jsonData.data.images.original.url;
        console.log(gifUrl);

        // Get the GIF title
        var gifTitle = jsonData.data.title;

        // Create a div to hold the GIF and its caption
        var gifContainer = document.createElement('div');

        // Create the GIF element
        var gif = document.createElement('img');
        gif.setAttribute('src', gifUrl);

        // Create the caption element
        var caption = document.createElement('p');
        caption.textContent = gifTitle;
        caption.classList.add('caption'); 

        // Append the GIF and caption to the container
        gifContainer.appendChild(gif);
        gifContainer.appendChild(caption);

        // Append the container to the document body
        document.body.appendChild(gifContainer);
    })
    .catch(function(error) {
        console.error('Error fetching random GIF:', error);
    });

