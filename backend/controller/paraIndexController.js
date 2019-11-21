
const fs = require('fs');
var counter = 0, counter1 = 0;

var indexObj = {}; 
exports.createIndex = function(req,res,next) {
    books = req.body;
    indexObj = {};
    
    /* For each document, turn to string, lowercase, remove special characters
     * and trim beginning of line spaces.
     Use forEach to iterate through each document obtaining its position in the document.
     */
    this.books.forEach((book, docIndex) => {

      var bookObjectString = JSON.stringify(book.paraValue).toLowerCase()
      .replace(/\W/g, ' ').replace(/\s+/g, ' ')
      .trim();
      var flag = 0;
       bookObjectString.split(' ').map((word,wordIndex) => {

                bookObjectString.split(' ').map((word1)=>{
                    counter++;
                    if(word == word1)
                    counter1++;
                });  
                value = counter1/counter;
                counter=0,counter1=0;
                if(!indexObj.hasOwnProperty(word))
                {
                    indexObj[word] = [{ paraId : book.id, tfValue : value }];
                    flag=1;
                }
                else{
                    console.log(indexObj[word][indexObj[word].length - 1].paraId);
                    if(indexObj[word][indexObj[word].length - 1].paraId != book.id)
                   {
                        indexObj[word].push({ paraId : book.id, tfValue : value });
                        flag=1;
                   }
                }
       });
    });
   
    


    console.log(indexObj);
    res.status(200).json({
        ...indexObj
    })
  }

exports.clearIndex = function(req,res,next)
{
    indexObj = undefined;
    global.gc();
}  



  // Method to search the index for a term
exports.searchIndex = function(req,res,next) {
   
    //  console.log(req.body);
      let term = req.body.wordValue;
      let indexObj = JSON.parse(req.body.indexObj);
      console.log(typeof(indexObj[term]));
      console.log(indexObj,term);
      if (typeof term === 'string') {
        // Filter the index for a search term
       //    if(indexObj.hasOwnProperty(term))
           {  
               // console.log(indexObj.term);
               indexObj[term].sort((a,b)=>{
                   if(a.tfValue < b.tfValue)
                      return 1;
                   else
                      return -1;
                   return 0;      
               })
           
           if(indexObj[term].length <= 10)
             {
                 res.status(200).json({
                    ...Object.assign({},indexObj[term])
                 })
             }
            else
            {
                res.status(200).json({
                    ...Object.assign({},indexObj[term].slice(0,10))
                })
            } 
            console.log(Object.assign({},indexObj[term]));
        }
        }
  }

