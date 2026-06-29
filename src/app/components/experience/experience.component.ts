import { AfterViewInit, Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);

  experiences = this.portfolioService.getExperience();
  expanded = signal<Record<string, boolean>>({});

  ngOnInit() {
    gsap.set(['.exp-eyebrow', '.exp-title', '.exp-subtitle'], { opacity: 0, y: 20 });
    gsap.set('.timeline-line-fill', { scaleY: 0, transformOrigin: 'top' });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.exp-eyebrow', '.exp-title', '.exp-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
      },
    });

    gsap.to('.timeline-line-fill', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true,
      },
    });

    gsap.utils.toArray('.experience-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        });
    });
  }

  toggle(id: string) {
    this.expanded.update(m => ({ ...m, [id]: !m[id] }));
  }
}
