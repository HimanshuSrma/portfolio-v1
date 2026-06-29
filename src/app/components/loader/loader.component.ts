import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  lines = [
    { cmd: '> booting portfolio.exe', delay: 60 },
    { cmd: '> resolving modules ...... OK', delay: 90 },
    { cmd: '> loading Angular runtime .. OK', delay: 90 },
    { cmd: '> hydrating components ..... OK', delay: 90 },
    { cmd: '> warming up GSAP timeline . OK', delay: 90 },
    { cmd: '> initialising HimmanshuSharma.profile', delay: 100 },
  ];

  visibleLines = signal<string[]>([]);
  progress = signal(0);
  done = signal(false);
  exiting = signal(false);

  ngOnInit(): void {
    this.runSequence();
  }

  private async runSequence() {
    for (let i = 0; i < this.lines.length; i++) {
      await this.wait(this.lines[i].delay);
      this.visibleLines.update(v => [...v, this.lines[i].cmd]);
      this.progress.set(Math.round(((i + 1) / (this.lines.length + 1)) * 100));
    }
    await this.wait(200);
    this.progress.set(100);
    this.done.set(true);
    await this.wait(600);
    this.exiting.set(true);
    await this.wait(700);
    this.finished.emit();
  }

  private wait(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }
}
