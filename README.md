# TapSearch

A simple web app with two major functionalities -

    * It takes in multiple paragraphs of text, assigns a unique ID To each paragraph and stores the words to paragraph mappings on an inverted index. This is similar to what elasticsearch does. This paragraph can also be referred to as a ‘document’

    * Given a word to search for, it lists out the top 10 paragraphs in which the word is present

## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

To set up and running: 

**1.** Clone the repo.
```
git clone https://github.com/SarthakSri98/tapSearch.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd tapSearch
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  Also, install nodemon with ```npm install nodemon``` if not installed. The app gets up and running on port 8000 with ```npm start```.
 

## Scenario of the project


### Creation of Inverted Indexes
We give a text sample and then in return get a inverted index of each word mapped to different paragraph(docs) in the text.
 1. A REST API request to **POST** on the url _/para/createIndex_. 
 2. There will be a fileContent property to be filled with input and then a function will be called to index each paragraph in the text.
 3. After that we send the doc at the backend. There, each doc is split into array of words and each word is mapped to the paragraphs they are in along with their term frequency value.
 4. The doc will be returned to the front-end.
 ```
 {
    "user": "sarthak",
    "authorized": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhd2Zlc2dyIiwiaWF0IjoxNTQ5MTI2OTgwLCJleHAiOjE1NDkxMzA1ODB9.ywbMXejRhwsxg9A3QRcgPbh7bq2DnPBNTL3h2yIpaiM"
}
 ```

### Image Thumbnail Generation
This request contains a public image URL. It downloads the image, resizes to 50x50 pixels, and returns the resulting thumbnail.
 1. Set the request to **POST** and the url to _/image/generate-thumbnail_.
 2. Set the key ```imageUrl``` to a public image url.
 3. The token generated earlier will be patched with the key.
 4. At first, if JWT is missing or invalid then the request will be rejected otherwise,
 4. Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample result as below:
 ```
 {
    "authorized": true
    "converted": true
    "imagePath": "/backend/images/635thumbnail.png"
}
```





## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing


