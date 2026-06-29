import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);
  steps = this.portfolioService.getProcess();

  ngOnInit() {
    gsap.set(['.process-eyebrow', '.process-title', '.process-subtitle'], { opacity: 0, y: 20 });
    gsap.set('.process-step', { opacity: 0, y: 40 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#process',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.process-eyebrow', '.process-title', '.process-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
      },
    });

    gsap.utils.toArray('.process-step').forEach((el: any, i: number) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        delay: i * 0.05,
      });
    });
  }
}
