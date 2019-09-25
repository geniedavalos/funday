import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({  providedIn: 'root'})


export class SocketService {
  private socket = io('http://localhost:8000');

  joinRoom(data) {
    console.log('from socket service');
    this.socket.emit('join', data);
  }

  newMessage() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('OutMessage', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  sendMessage(user, msg) {
    this.socket.emit('newMessage', {user, msg});
  }
  //
  // leaveRoom(data) {
  //   this.socket.emit('leave', data);
  // }
  //
  // userLeftRoom() {
  //   const observable = new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('left room', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {this.socket.disconnect(); };
  //   });
  //
  //   return observable;
  // }
  //

  //
  // newMessageReceived() {
  //   const observable = new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {this.socket.disconnect(); };
  //   });
  //
  //   return observable;
  // }
}
