import { AfterViewInit, Component, computed, ElementRef, HostListener, inject, OnInit, signal, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Project } from '../../models/portfolio.model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);

  projects = this.portfolioService.getProjects();
  filters = ['All', 'Angular', 'AI', 'Google Maps', 'PrimeNG', 'TailwindCSS'];
  activeFilter = signal<string>('All');
  visibleProjects = computed(() => {
    const f = this.activeFilter();
    if (f === 'All') return this.projects;
    if (f === 'AI') return this.projects.filter(p => /ai|pdf parser|dxf/i.test(p.title + ' ' + p.description + ' ' + p.technologies.join(' ')));
    return this.projects.filter(p => p.technologies.some(t => t.toLowerCase().includes(f.toLowerCase())));
  });

  selectedProject = signal<Project | null>(null);

  @ViewChildren('tiltCard') tiltCards!: QueryList<ElementRef<HTMLElement>>;

  ngOnInit() {
    gsap.set(['.projects-eyebrow', '.projects-title', '.projects-subtitle', '.projects-filters'], { opacity: 0, y: 20 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.projects-eyebrow', '.projects-title', '.projects-subtitle', '.projects-filters'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
      },
    });

    gsap.utils.toArray('.project-card').forEach((card: any, i: number) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: (i % 3) * 0.08,
        });
    });
  }

  setFilter(f: string) {
    this.activeFilter.set(f);
    setTimeout(() => ScrollTrigger.refresh(), 50);
  }

  openProject(p: Project) {
    this.selectedProject.set(p);
    document.body.style.overflow = 'hidden';
  }
  closeProject() {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  onTilt(ev: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateX: -y * 6, rotateY: x * 8, transformPerspective: 1000, duration: 0.4, ease: 'power2.out' });
  }
  onTiltOut(el: HTMLElement) {
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.selectedProject()) this.closeProject(); }
}
