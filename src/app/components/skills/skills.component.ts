import { AfterViewInit, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Skill } from '../../models/portfolio.model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SkillGroup { key: string; label: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioDataService);

  skills = this.portfolioService.getSkills();
  groups: SkillGroup[] = this.buildGroups();
  marqueeSkills = [...this.skills, ...this.skills];

  ngOnInit() {
    gsap.set(['.skills-eyebrow', '.skills-title', '.skills-subtitle'], { opacity: 0, y: 20 });
    gsap.set('.skill-group', { opacity: 0, y: 30 });
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(['.skills-eyebrow', '.skills-title', '.skills-subtitle'],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        gsap.to('.skill-group',
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.2, ease: 'power2.out' });
      },
    });
  }

  private buildGroups(): SkillGroup[] {
    const order: { key: string; label: string }[] = [
      { key: 'frontend', label: 'Frontend' },
      { key: 'backend', label: 'Backend' },
      { key: 'database', label: 'Database' },
      { key: 'tools', label: 'Dev Tools' },
      { key: 'cloud', label: 'Cloud & DevOps' },
      { key: 'other', label: 'Mobile / Other' },
    ];
    return order
      .map(o => ({ key: o.key, label: o.label, skills: this.skills.filter(s => s.category === o.key) }))
      .filter(g => g.skills.length);
  }
}
