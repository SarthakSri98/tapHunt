import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName
} from '@angular/forms';

import { Doc } from "../doc";
import { BaseService } from '../base.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jsonpatch = require('fast-json-patch')

  indexForm;
  searchForm;
  str : string;
  array : any = [];
  docObject = [];
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


  }

 

  inputDoc()
  {
    console.log(this.indexForm.value);
    this.str = this.indexForm.value.fileContent; 
    this.array = this.str.split(/\n\s*\n/g);

    for(let i=0;i< this.array.length ; i++)
    { 
      let obj:Doc = { id : "para" + this.id++ , paraValue : this.array[i] }
        this.docObject.push(obj);
    }

    console.log(this.docObject);

    this._base.createIndex(this.docObject).subscribe((res)=>{
        this.invertedIndexObj = res;
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

    this._base.searchPara(obj).subscribe((res)=>{
      console.log("a",res);
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
     })
  }

}
