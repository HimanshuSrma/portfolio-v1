import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { gsap } from 'gsap';

interface NavItem { id: string; label: string; }

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private themeService = inject(ThemeService);
  isDark = this.themeService.isDarkMode;
  isMobileMenuOpen = signal(false);
  scrolled = signal(false);
  activeSection = signal('home');
  scrollProgress = signal(0);

  navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Stack' },
    { id: 'experience', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Praise' },
    { id: 'contact', label: 'Contact' },
  ];

  ngOnInit() {
    gsap.fromTo('.logo', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    gsap.fromTo('.nav-link',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: 'power2.out' }
    );
  }

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.scrolled.set(y > 30);
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress.set(total > 0 ? y / total : 0);

    let current = 'home';
    for (const item of this.navItems) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= 120) current = item.id;
    }
    this.activeSection.set(current);
  }

  toggleTheme() { this.themeService.toggleTheme(); }
  toggleMobileMenu() { this.isMobileMenuOpen.update(v => !v); }
  closeMenu() { this.isMobileMenuOpen.set(false); }
}
