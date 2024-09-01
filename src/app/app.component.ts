import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  projectsPath = false;
  screenWidth!: number;
  mobile = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }
  ngOnInit() {
    this.getScreenWidth();
  }
  ngDoCheck() {
    if (this.router.url === '/works') {
      this.projectsPath = true;
    } else {
      this.projectsPath = false;
    }
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
