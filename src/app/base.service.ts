import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BaseService {


  constructor(private http: HttpClient) {}

  createIndex(data) {
    return this.http.post('http://localhost:8000/para/createIndex', data);
  }

  searchPara(data)
  { console.log(data);
    return this.http.post<{ paraId : string }>('http://localhost:8000/para/searchTerm', data);
  }

  // submitImage(data) {
  //   return this.http.post < {
  //     message: string,
  //     imagePath: string
  //   } > ('http://localhost:8000/image/generate-thumbnail', data)
  // }

}
