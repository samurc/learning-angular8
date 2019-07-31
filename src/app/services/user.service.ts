import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  constructor() {
    const usuario1: User = {
      nick: 'Eduardo',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1,
      status: 'online'
    };
    const usuario2: User = {
      nick: "Freddy",
      age: 28,
      email: "fred@aoe.aoe",
      friend: true,
      uid: 2,
      status: "online"
    };
    const usuario3: User = {
      nick: "Yuliana",
      age: 18,
      email: "yuli@aoe.aoe",
      friend: true,
      uid: 3,
      status: "offline"
    };
    const usuario4: User = {
      nick: "Ricardo",
      age: 17,
      email: "rick@aoe.aoe",
      friend: false,
      uid: 4,
      status: "busy"
    };
    const usuario5: User = {
      nick: "Marcos",
      age: 30,
      email: "marcos@aoe.aoe",
      friend: false,
      uid: 5,
      status: "away"
    };
    this.friends = [usuario1, usuario2, usuario3, usuario4, usuario5];
  }

  getFriends() {
    return this.friends;
  }
}
