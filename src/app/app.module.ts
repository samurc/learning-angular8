import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './app-shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { UserStatusPipe } from './pipes/user-status';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    UserStatusPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AppSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
