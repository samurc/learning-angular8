import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {
  status: string = '';

  public transform(value: any) {
    switch (value) {
      case 'online':
        this.status = 'assets/img/logo_live_online.png';
        break;
      case 'offline':
        this.status = 'assets/img/logo_live_offline.png';
        break;
      case 'busy':
        this.status = 'assets/img/logo_live_busy.png';
        break;
      default:
        this.status = 'assets/img/logo_live_away.png';
    }
    return this.status;
  }
}