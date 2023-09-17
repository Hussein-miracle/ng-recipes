import { Directive, Renderer2, OnInit, ElementRef, HostListener ,HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'transparent';
  @Input() highlightColor:string = '#212121';
  @HostBinding('style.backgroundColor') backgroundColor:string = this.defaultColor;
  @HostBinding('style.color') color:string = 'black';

  constructor(private el: ElementRef, private renderer: Renderer2) { }


  ngOnInit(): void {
    // console.log(this.renderer, 'renderer2')
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mousemove(eventData: Event) {
    console.log({eventData})
    // this.renderer.setStyle(this.el.nativeElement, "background-color", "#212121")
    // this.renderer.setStyle(this.el.nativeElement, "color", "#ccc")
    this.backgroundColor  = this.highlightColor;
    this.color = "#eee"
  }
  
  
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //console.log({eventData})
    // this.renderer.setStyle(this.el.nativeElement, "background-color", "transparent")
    // this.renderer.setStyle(this.el.nativeElement, "color", "#212121")

    this.backgroundColor = this.defaultColor;
    this.color = "#000"
  }
}
