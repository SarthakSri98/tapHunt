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
    this.array = this.str.split(/\s\s+/g);

    for(let i=0;i< this.array.length ; i++)
    { 
      let obj:Doc = { id : "para" + this.id++ , paraValue : this.array[i] }
        this.docObject.push(obj);
    }

    console.log(this.docObject);

    this._base.createIndex(this.docObject).subscribe((res)=>{
        this.invertedIndexObj = res;
        console.log(this.invertedIndexObj);
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

  })

  }

}
