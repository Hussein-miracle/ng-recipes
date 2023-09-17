import { Directive, OnInit, HostListener, HostBinding } from '@angular/core';



@Directive({
  selector:'[appDropdown]'
})   
export class DropdownDirective implements OnInit{
  @HostBinding('class.open') isOpen:boolean = false;
  ngOnInit(): void {
      
  }

  @HostListener('click') toggleIsOpen(){
    this.isOpen = !this.isOpen;
  }


}