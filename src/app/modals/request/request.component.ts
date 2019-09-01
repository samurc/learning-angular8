import { Component, Inject } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface RequestData {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.css"]
})
export class RequestComponent {
  scope: any;
  shouldAdd: string = "yes";
  currentRequest: any;
  constructor(
    private userService: UserService,
    private requestService: RequestsService,
    public dialogRef: MatDialogRef<RequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestData
  ) {
    this.scope = this.data.scope;
    this.currentRequest = this.data.currentRequest;
  }

  accept() {
    if (this.shouldAdd === "yes") {
      this.requestService
        .setRequestStatus(this.currentRequest, "accepted")
        .then(data => {
          this.userService
            .addFriend(this.scope.user.uid, this.currentRequest.sender)
            .then(() => {
              alert("Solicitud aceptada con éxito");
            });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.shouldAdd === "no") {
      this.requestService
        .setRequestStatus(this.currentRequest, "rejected")
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.shouldAdd === "layer") {
      this.requestService
        .setRequestStatus(this.currentRequest, "decide_later")
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.dialogRef.close();
  }
}
