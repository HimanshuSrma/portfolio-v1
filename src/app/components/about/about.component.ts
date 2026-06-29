import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);

  personalInfo = this.portfolioService.getPersonalInfo();
  stats = this.portfolioService.getStats();
  experiences = this.portfolioService.getExperience();

  @ViewChildren('counter') counterEls!: QueryList<ElementRef<HTMLElement>>;

  pillars = [
    { icon: 'code', title: 'Clean Architecture', desc: 'Modular, scalable Angular component systems.' },
    { icon: 'bolt', title: 'Performance First', desc: '90+ Lighthouse, lazy-loaded, code-split by default.' },
    { icon: 'users', title: 'User Empathy', desc: 'Forms, flows and UI that real teams actually use.' },
    { icon: 'shield', title: 'Production-Ready', desc: 'Battle-tested with 70k+ users in flagship products.' },
  ];

  ngOnInit() {
    gsap.set(['.about-eyebrow', '.about-title', '.about-subtitle'], { opacity: 0, y: 20 });
    gsap.set('.about-content > *', { opacity: 0, y: 30 });
    gsap.set('.about-pillar', { opacity: 0, y: 30 });
    gsap.set('.stat-item', { opacity: 0, y: 30 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.about-eyebrow', '.about-title', '.about-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        gsap.to('.about-content > *',
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' });
        gsap.to('.about-pillar',
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' });
        gsap.to('.stat-item',
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: 'power2.out' });
        this.animateCounters();
      },
    });
  }

  private animateCounters() {
    this.counterEls.forEach((ref, i) => {
      const target = this.stats[i].value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => { ref.nativeElement.textContent = Math.floor(obj.val).toString(); },
      });
    });
  }
}
