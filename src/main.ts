import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './app/components/about/about.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { EducationComponent } from './app/components/education/education.component';
import { ExperienceComponent } from './app/components/experience/experience.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { HeaderComponent } from './app/components/header/header.component';
import { HeroComponent } from './app/components/hero/hero.component';
import { ProjectsComponent } from './app/components/projects/projects.component';
import { SkillsComponent } from './app/components/skills/skills.component';
import { TestimonialsSectionComponent } from './app/components/testimonial/testimonials.component';
import { LoaderComponent } from './app/components/loader/loader.component';
import { ProcessComponent } from './app/components/process/process.component';
import { FaqComponent } from './app/components/faq/faq.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    ProcessComponent,
    TestimonialsSectionComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-loader *ngIf="!loaded()" (finished)="onLoaded()"></app-loader>

    <div class="w-full overflow-x-hidden min-h-screen transition-colors duration-300"
         [style.opacity]="loaded() ? 1 : 0"
         style="transition: opacity .6s ease;">
      <app-header></app-header>
      <main>
        <app-hero></app-hero>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-experience></app-experience>
        <app-education></app-education>
        <app-projects></app-projects>
        <app-process></app-process>
        <app-testimonials-section></app-testimonials-section>
        <app-faq></app-faq>
        <app-contact></app-contact>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class App {
  loaded = signal(false);

  onLoaded() {
    this.loaded.set(true);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }
}

bootstrapApplication(App, {
  providers: [provideRouter([])],
});
