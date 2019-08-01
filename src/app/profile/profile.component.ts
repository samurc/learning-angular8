import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  statusList: any [];
  constructor() {
    this.statusList = [
      { slug: "online", name: "Conectado" },
      { slug: "away", name: "Ausente" },
      { slug: "busy", name: "Ocupado" },
      { slug: "appear_offline", name: "Desconectado" }
    ];
  }

  ngOnInit() {
  }

}
