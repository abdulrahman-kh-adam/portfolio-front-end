import {
  Component,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { IAbout } from './about.models';
import { AboutService } from './about.service';
import { env } from '../../../environments';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutInfo!: IAbout;
  failMessage = false;
  aboutService = inject(AboutService);
  url = env.SERVER_URL;
  screenWidth!: number;
  mobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    this.aboutService.getHomeInfo().subscribe((res) => {
      if (res.status === 'success') {
        this.aboutInfo = res.data.aboutInfo[0];
      } else {
        this.failMessage = true;
      }
    });
    this.getScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
    if (this.screenWidth < 1000) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  getScreenWidth(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
    if (this.screenWidth < 1000) {
      this.mobile = true;
    }
  }
}
