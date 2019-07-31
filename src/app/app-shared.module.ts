import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule]
})
export class AppSharedModule {}
