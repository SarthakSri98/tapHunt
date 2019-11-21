import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName
} from '@angular/forms';

import { Doc } from "../doc";
import { BaseService } from '../base.service';
import {  applyOperation} from 'fast-json-patch'
declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  
  jsonpatch = require('fast-json-patch');

  indexForm;
  searchForm;
  pdfForm;
  str : string;
  array : any = [];
  docObject:Doc[] = [];
  id : number = 0;
  invertedIndexObj = {};
  finalParaObj = {};
  dumpArr = [];
  finalArray = [];
  constructor( private _base : BaseService ) { }

  ngOnInit() {
     this.indexForm = new FormGroup({
      fileContent: new FormControl(''),
    })

    this.searchForm = new FormGroup({
      wordValue: new FormControl(''),
    })

    if(localStorage.getItem('invertedIndexObj'))
    this.invertedIndexObj = JSON.parse(localStorage.getItem('invertedIndexObj'));

    if(localStorage.getItem('docObject'))
    this.docObject = JSON.parse(localStorage.getItem('docObject'));

    if(localStorage.getItem('id'))
    this.id = JSON.parse(localStorage.getItem('id'));

  }

 

  inputDoc()
  {
    console.log(this.indexForm.value);
    this.str = this.indexForm.value.fileContent; 
    this.array = this.str.split(/\n\s*\n/g);

    for(let i=0;i< this.array.length ; i++)
    { 
      let obj:Doc = { id : "para" + this.id++ , paraValue : this.array[i] }
       if(this.docObject)
        this.docObject.push(obj);
      //  else
      //   this.docObject[0] = obj; 
    }
    localStorage.setItem('docObject',JSON.stringify(this.docObject));
    localStorage.setItem('id',JSON.stringify(this.id));
    console.log(this.docObject);

    this._base.createIndex(this.docObject).subscribe((res)=>{

      if(localStorage.getItem('invertedIndexObj'))
        Object.assign(this.invertedIndexObj,res);
       else
        this.invertedIndexObj = res; 

      localStorage.setItem('invertedIndexObj',JSON.stringify(this.invertedIndexObj));
      console.log(this.invertedIndexObj);
      window.alert("Index created");
    })

  }
  


  inputWord()
  {
    
    var obj = this.searchForm.value;
    var patch = [{
      op: "add",
      path: "/indexObj",
      value: JSON.stringify(this.invertedIndexObj)
    }, ];
    obj = this.jsonpatch.applyPatch(obj, patch).newDocument;
     console.log(this.invertedIndexObj);
    this._base.searchPara(obj).subscribe((res)=>{
      console.log("a",res);
      if(res.result == "f")
      {
        window.alert(res.message);
        return;
      }
      this.finalParaObj = res;
      console.log(this.finalParaObj);
      console.log(this.docObject);
      for(let i=0;i<Object.keys(this.finalParaObj).length;i++)
      {
          for(let j=0;j<Object.keys(this.docObject).length;j++)
          {
           // console.log(this.finalParaObj,this.docObject);
              if(this.finalParaObj[i].paraId == this.docObject[j].id)
               {
                 console.log(this.finalParaObj[i].paraId,this.docObject[j].id);
                   console.log(this.docObject[j].paraValue,this.finalParaObj[i].tfValue);  
                   this.dumpArr.push(this.docObject[j].paraValue);
               }
          }
      }
      this.finalArray = this.dumpArr;
      this.dumpArr = [];

  })

  }

  clearIndexes()
  {
    this.array  = [];
    this.docObject = [];
    this.invertedIndexObj = {};
    this.finalParaObj = {};
    this.dumpArr = [];
    this.finalArray = [];
    
    this.id = 0;
     this._base.clearIndexes().subscribe((res)=>{
       console.log(res);
       this.indexForm.reset();
       this.searchForm.reset();
       localStorage.clear();
       window.alert("All indexes are cleared");
     })
  }

}
