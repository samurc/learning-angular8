import { Component, OnInit, Inject } from "@angular/core";
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { RequestsService } from '../services/requests.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.userService
      .getUsers()
      .valueChanges()
      .subscribe(
        (data: User[]) => {
          this.friends = data;
        },
        error => {
          console.log(error);
        }
      );

    this.authenticationService.getStatus().subscribe(
      status => {
        this.userService
          .getUserById(status.uid)
          .valueChanges()
          .subscribe(
            (data: User) => {
              this.user = data;
              if (this.user.friends) {
                this.user.friends = Object.values(this.user.friends);
              }
              console.log(this.user);
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  logout() {
    this.authenticationService
      .logOut()
      .then(() => {
        alert('Sesión cerrada');
        this.router.navigate(['login']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentRequestComponent, {
      data: { user: this.user }
    });
  }
}

// Modal
export interface DialogData {
  user: User;
}
@Component({
  selector: "app-dialog-content-request",
  templateUrl: "modal/dialog-content-request.html"
})
export class DialogContentRequestComponent {
  friendEmail: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogContentRequestComponent>,
    private requestService: RequestsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.data.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request).then(() => {
      alert('Solicitud enviada');
      this.dialogRef.close();
    }).catch((error) => {
      alert('Hubo un error');
      console.log(error);
    });
  }
}
