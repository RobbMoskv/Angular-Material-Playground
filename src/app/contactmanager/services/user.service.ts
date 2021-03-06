import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  }

  constructor(private http: HttpClient) {

    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  // Allow components to subscribe to data changes through observable
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadUserById(id){
    return this.dataStore.users.find(user => user.id == id);
  }
  
  loadAllUsers() {
    const url = 'https://angular-material-api.azurewebsites.net/users';

    this.http.get<User[]>(url).subscribe(
      data => {
        this.dataStore.users = data;
        // inform subscribers about changes
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log(`Failed to fetch this thing. Error: ${error.message}`);
      }
    );

  }

  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      // inform subscribers about changes
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }
}
