import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit{
  @Output() navItemClicked =  new Subject<{navItem:string}>()
  constructor(private dataStorageService:DataStorageService){

  }
  ngOnInit(): void {
      
  }

  onClickNavItem(navItem:string){
    this.navItemClicked.next({
      navItem
    })
  }


  onSave(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipesFromBackend().subscribe();
  }
}
