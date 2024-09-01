import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  screenWidth!: number;
  mobile = false;
  burgerMenu = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
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

  toggleMenu(): void {
    this.burgerMenu = !this.burgerMenu;
  }
}
