import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

export interface User {
  name: string;
  surname: string;
  id?: number;
}

@Injectable()
export class UsersStore {

  private readonly _users = new BehaviorSubject<User[]>(null);
  public readonly users$ = this._users.asObservable();

  constructor(private http: HttpClient) {
    this.init();
  }

  get users() {
    return this._users.getValue();
  }

  /**
   *
   * @param val User[]
   */
  set users(val: User[]) {
    this._users.next(val);
  }


  init() {
    return this.loadUser()
      .pipe(
        delay(2000)
      )
      .subscribe(users => this._users.next(users));
  }

  addUser(user: User) {
    const users = this._users.getValue();

    this.users = [
      ...users,
      Object.assign(user, { id: users.length })
    ];
  }

  removeUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  editUser(editedUser: User) {
    this.users = this._users.getValue().map(u => {
      if (u.id === editedUser.id) {
        return editedUser;
      } else {
        return u;
      }
    });
  }

  searchUser(query: string) {
    return of(
      this.users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()))
    );
  }

  loadUser(): Observable<User[]> {
    return this.http.get<User[]>('assets/users.json').pipe(
      // delay(1000)
    );
  }

  update(users: User[]) {
    this._users.next(users);
  }
}
