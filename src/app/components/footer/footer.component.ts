import { Component, HostListener, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  private portfolioService = inject(PortfolioDataService);

  personalInfo = this.portfolioService.getPersonalInfo();
  contact = this.portfolioService.getContact();
  availability = this.portfolioService.getAvailability();
  currentYear = new Date().getFullYear();

  showBackToTop = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.showBackToTop.set(window.scrollY > 600);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
