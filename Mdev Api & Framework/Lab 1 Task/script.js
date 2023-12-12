fetch('https://hplussport.com/api/products?order=price')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData){
        // Sort products by price
        jsonData.sort(function(a, b) {
            return a.price - b.price;
        });

        // Display all the product information
        for(var items in jsonData){
            var productName = jsonData[items].name;
            var product = document.createElement('li');
            product.innerHTML = productName;
            document.body.appendChild(product);

            // Display all the product image 
            var productImg = jsonData[items].image;
            var image = document.createElement('img');
            image.setAttribute('src', productImg);
            document.body.appendChild(image);

            // Display the price of each product
            var productPrice = jsonData[items].price;
            var price = document.createElement('p');
            price.innerHTML = 'Price: $' + productPrice;
            document.body.appendChild(price);
        }
    })
    .catch(function(error) {
        console.error('Error fetching product data:', error);
    });

