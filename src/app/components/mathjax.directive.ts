import {Directive, ElementRef, Input} from '@angular/core';
@Directive({
  selector: '[MathJax]'
})
export class MathJaxDirective {
  @Input(' MathJax')
  texExpression: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.texExpression;
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement])');
  }
}
