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

  clearIndexes()
  {
     return this.http.delete('http://localhost:8000/para/clearIndexes');
  }

}
