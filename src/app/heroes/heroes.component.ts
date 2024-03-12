import { Component } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes'
import {HeroService} from '../hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
    
})
export class HeroesComponent {
  //heroes=HEROES;
  heroes:Hero[]=[];
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };  */
  selectedHero?: Hero;

  constructor(private heroService:HeroService){


  }
  /*getHeroes():void{
    this.heroes=this.heroService.getHeroes();

  }*/
  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(serviceHeroes=> this.heroes=serviceHeroes);

  }
  ngOnInit():void{
    this.getHeroes();

  }
  
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
