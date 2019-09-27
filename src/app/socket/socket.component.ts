import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  user = 'phat';
  userList=[];
  chatMessage = [];
  constructor(
    private readonly socketService: SocketService,

  ) { }
  ngOnInit() {
    console.log('App component');

    this.join();
    // this.socketService.newMessage().subscribe(data => {
    //   console.log('data = ', data);
    //   this.chatMessage.push(data.msg);
    // });
    // this.socketService.newUser().subscribe(data => {
    //   console.log('data = ', data);
    //   this.userList.push(data.msg.user)
    // });

  }
  join() {
    this.socketService.joinRoom('phat');
  }

  sendMessage(event: Event) {
    event.preventDefault()
    // console.log(event.target.message.value)
    // this.socketService.sendMessage(this.user , event.target.message.value);
  }
}
