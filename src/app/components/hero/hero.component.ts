import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioDataService);

  personalInfo = this.portfolioService.getPersonalInfo();
  contact = this.portfolioService.getContact();
  availability = this.portfolioService.getAvailability();
  roles = this.portfolioService.getRoles();

  typed = signal('');
  private roleIdx = 0;
  private charIdx = 0;
  private deleting = false;
  private typeTimer: any;

  @ViewChild('orb') orbRef?: ElementRef<HTMLElement>;
  private mouseX = 0;
  private mouseY = 0;

  ngOnInit() {
    gsap.set(['.hero-eyebrow', '.hero-title', '.hero-typed-line', '.hero-bio', '.hero-cta', '.hero-meta'], { opacity: 0, y: 30 });
    gsap.set('.hero-visual', { opacity: 0, scale: 0.85 });
    this.tick();
  }

  ngAfterViewInit() {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to('.hero-title',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.25')
      .to('.hero-typed-line', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('.hero-bio',    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('.hero-cta',    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('.hero-meta',   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to('.hero-visual', { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, '-=0.9');

    gsap.to('.hero-shape', {
      y: '+=18', rotation: '+=4', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.4,
    });
  }

  ngOnDestroy() { clearTimeout(this.typeTimer); }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    if (this.orbRef?.nativeElement) {
      this.orbRef.nativeElement.style.transform =
        `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    }
  }

  private tick() {
    const current = this.roles[this.roleIdx];
    if (!this.deleting) {
      this.charIdx++;
      this.typed.set(current.slice(0, this.charIdx));
      if (this.charIdx === current.length) {
        this.deleting = true;
        this.typeTimer = setTimeout(() => this.tick(), 1500);
        return;
      }
      this.typeTimer = setTimeout(() => this.tick(), 70 + Math.random() * 40);
    } else {
      this.charIdx--;
      this.typed.set(current.slice(0, this.charIdx));
      if (this.charIdx === 0) {
        this.deleting = false;
        this.roleIdx = (this.roleIdx + 1) % this.roles.length;
      }
      this.typeTimer = setTimeout(() => this.tick(), 35);
    }
  }
}
