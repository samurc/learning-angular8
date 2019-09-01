import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";
import { ConversationService } from "../services/conversation.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation.component.html",
  styleUrls: ["./conversation.component.css"]
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;
  conversationList: any;
  shake: boolean = false;
  picture: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage
  ) {
    this.friendId = this.activateRoute.snapshot.params.uid;

    this.authenticationService.getStatus().subscribe(session => {
      this.userService
        .getUserById(session.uid)
        .valueChanges()
        .subscribe((user: User) => {
          this.user = user;
          // get Data friend
          this.userService
            .getUserById(this.friendId)
            .valueChanges()
            .subscribe(
              (data: User) => {
                this.friend = data;
                const ids = [this.user.uid, this.friend.uid].sort();
                this.conversationId = ids.join("|");
                this.getConversation();
              },
              error => {
                console.log(error);
              }
            );
        });
    });
  }

  ngOnInit() {}

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: "text"
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = "";
    });
  }

  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: "zumbido"
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido();
  }

  sendPicture(p) {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      image: p,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: "image"
    };
    this.conversationService.createConversation(message).then(() => {});
  }

  doZumbido() {
    const audio = new Audio();
    audio.src = "assets/sound/zumbido.m4a";
    audio.load();
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getConversation() {
    this.conversationService
      .getConversation(this.conversationId)
      .valueChanges()
      .subscribe(
        data => {
          this.conversationList = data;
          this.conversationList.forEach(message => {
            if (!message.seen) {
              message.seen = true;
              this.conversationService.editConversation(message);
              if (
                message.type === "text" ||
                message.type === "image"
              ) {
                const audio = new Audio();
                audio.src = "assets/sound/new_message.m4a";
                audio.load();
                audio.play();
              } else if (message.type === "zumbido") {
                this.doZumbido();
              }
            }
          });
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  getUserAvatarById(id) {
    if (id === this.friend.uid) {
      return this.friend.avatar || "assets/img/generic_avatar.png";
    } else {
      return this.user.avatar || "assets/img/generic_avatar.png";
    }
  }

  fileChangeEvent(event: any): void {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (file) {
      reader.onload = (e: any) => {
        if (e.target.result) {
          const currentPictureId = Date.now();
          const pictures = this.firebaseStorage
            .ref("conversation/" + currentPictureId + ".jpg")
            .putString(e.target.result, "data_url");
          pictures
            .then(result => {
              this.picture = this.firebaseStorage
                .ref("conversation/" + currentPictureId + ".jpg")
                .getDownloadURL();
              this.picture.subscribe(p => {
                this.sendPicture(p);
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
