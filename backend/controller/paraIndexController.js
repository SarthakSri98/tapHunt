
const fs = require('fs');
var counter = 0, counter1 = 0;
exports.createIndex = function(req,res,next) {
    console.log(req.body);
    this.books = req.body;
    this.indexObj = {};
    
    /* For each document, turn to string, lowercase, remove special characters
     * and trim beginning of line spaces.
     Use forEach to iterate through each document obtaining its position in the document.
     */
    this.books.forEach((book, docIndex) => {

      var bookObjectString = JSON.stringify(book.paraValue).toLowerCase()
      .replace(/\W/g, ' ').replace(/\s+/g, ' ')
      .trim();

       bookObjectString.split(' ').map((word,wordIndex) => {
       
                bookObjectString.split(' ').map((word1)=>{
                    counter++;
                    if(word == word1)
                    counter1++;
                });  
                value = counter1/counter;
                if(!indexObj.hasOwnProperty(word))
                {
                    indexObj[word] = [{ paraId : book.id, tfValue : value }];
                }
                else{
                    indexObj[word].push({ paraId : book.id, tfValue : value });
                }
       });
      

    });
    console.log(this.indexObj);
    res.status(200).json({
        ...this.indexObj
    })
  }

  

  // Method to search the index for a term
exports.searchIndex = function(req,res,next) {
   
    //  console.log(req.body);
      let term = req.body.wordValue;
      let indexObj = JSON.parse(req.body.indexObj);
      console.log(typeof(indexObj));
      console.log(indexObj,term);
      if (typeof term === 'string') {
        // Filter the index for a search term
       //    if(indexObj.hasOwnProperty(term))
           {  
               // console.log(indexObj.term);
               indexObj[term].sort((a,b)=>{
                   return a.tfValue > b.tfValue;
               })
           
           if(indexObj[term].length <= 10)
             {
                 res.status(200).json({
                     ...indexObj[term]
                 })
             }
            else
            {

                res.status(200).json({
                    ...(indexObj[term].slice(0,10))
                })
            } 
            console.log(indexObj[term]);
        }
        }
  }

