import { Injectable } from '@angular/core';
import {Hero} from './hero'
import {HEROES} from './mock-heroes'
import {Observable,of} from 'rxjs'
import {MessageService} from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //constructor() { }

  /*getHeroes():Hero[]{
    return HEROES;
  }*/
  constructor(private messageService:MessageService){}

  getHeroes():Observable<Hero[]>{

    const heroes=of(HEROES);
    this.messageService.add('HeroService: get all the heroes ')
    return heroes;

  }
  getHero(id:number):Observable<Hero>{
    const hero=HEROES.find(x=>x.id===id)!;
    this.messageService.add(`HeroService: find the hero using id=${id}`);
    return of(hero);


  }

}
