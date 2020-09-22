import { Component } from '@angular/core';
import { Client } from './interfaces/client';
import { ClientService } from './services/client.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clients';
  clients:Array<Client> = []
  client:Client = {
    name: '', lastname: '', email: ''
  }
  constructor(private service:ClientService){
    this.get()
  }

  add(){

    if (this.valitions()){
      this.service.add(this.client).subscribe(data => {
        console.log(data)
        this.get()
      })

    }
  }

  valitions():boolean{
    
    if (this.client.name.length>20){
      alert("El nombre del cliente tiene mas de 20 caracteres")
      return false
    }

    return true;
  }

  get(){
    this.service.getAll()
      .pipe(map(clients => {
        const _clients:Array<Client> = [];

        if (clients == null) return [];

        Object.keys(clients).forEach(key=>{
          const client:Client = clients[key];
          client.id = key;

          _clients.push(client)
        })

        return _clients;
      }))
      .subscribe(data=>{
        this.clients = data;
        console.log(this.clients)
      })
  }
}
