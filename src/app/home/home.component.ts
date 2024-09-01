import {
  Component,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { IHome } from './home.models';
import { HomeService } from './home.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  homeService = inject(HomeService);
  homeInfo!: IHome;
  failMessage = false;
  screenWidth!: number;
  mobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    this.homeService.getHomeInfo().subscribe((res) => {
      if (res.status === 'success') {
        this.homeInfo = res.data.homeInfo[0];
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
