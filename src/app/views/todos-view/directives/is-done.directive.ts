import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIsDone]',
  standalone: true
})
export class IsDoneDirective implements OnChanges {
  @Input() appIsDone: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    if (this.appIsDone) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '50%');
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
      this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
    }
  }
}
