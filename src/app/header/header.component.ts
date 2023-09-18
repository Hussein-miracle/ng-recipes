import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit,OnDestroy{
  @Output() navItemClicked =  new Subject<{navItem:string}>();
  private userSub:Subscription;
  isAuthenticated:boolean=false;
  constructor(private dataStorageService:DataStorageService,private authService:AuthService){

  }
  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe({next:(user:User) => {
    this.isAuthenticated = !user ? false : true;
    }})
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
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
