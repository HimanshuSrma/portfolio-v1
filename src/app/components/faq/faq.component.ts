import { AfterViewInit, Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);
  faqs = this.portfolioService.getFaqs();
  openIdx = signal<number | null>(0);

  toggle(i: number) {
    this.openIdx.update(curr => (curr === i ? null : i));
  }

  ngOnInit() {
    gsap.set(['.faq-eyebrow', '.faq-title', '.faq-subtitle'], { opacity: 0, y: 20 });
    gsap.set('.faq-item', { opacity: 0, y: 20 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#faq',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.faq-eyebrow', '.faq-title', '.faq-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        gsap.to('.faq-item',
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out' });
      },
    });
  }
}
