import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);
  education = this.portfolioService.getEducation();

  ngOnInit() {
    gsap.set(['.edu-eyebrow', '.edu-title', '.edu-subtitle'], { opacity: 0, y: 20 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#education',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.edu-eyebrow', '.edu-title', '.edu-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
      },
    });

    gsap.utils.toArray('.edu-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.1,
        });
    });
  }
}
