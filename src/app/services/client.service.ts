import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  uri = "https://clients-acfce.firebaseio.com/Clients.json";
  constructor(private http:HttpClient) { }

  getAll():Observable<Client[]>{
    return this.http.get<Client[]>(this.uri)
  }

  add(client:Client):Observable<any>{
    return this.http.post(this.uri, JSON.stringify(client))
  }
}
