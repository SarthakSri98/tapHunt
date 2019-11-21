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

### Retrieving top 10 results
We give second input as a keyword which will be searched in each of the paragraphs and the keyword's term frequency will be calculated and attached to each paragraph.
 1. A REST API request to **POST** on the url _/para/searchIndex_.
 2. There will be a wordValue property to be filled with the keyword.
 3. In the backend, this keyword's term frequency is calculated against each paragraph and attached to the paragraph in an object.
 4. The paragraphs are sorted and hence top 10 paragraphs can be retrieved.

### Clearing Indexes
Just click on the clear Index button and all the data will be cleared.
 1. A REST API request to **DELETE** on the _/para/clearIndexes_.

### Other features
 1. I have used localstorage for making the web app stateful and store the invertedIndex and the paragraphs in a variable. Refreshing the website won't lead to any deletion of data.
 2. Everytime you give new input for indexing it will be added to the previous indexes.

## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Angular](https://angular.io/) 


