import { Injectable } from '@angular/core';
import {Hero} from './hero'
import {HEROES} from './mock-heroes'
import {Observable,of} from 'rxjs'
import {MessageService} from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  
  };
  //constructor() { }

  /*getHeroes():Hero[]{
    return HEROES;
  }*/
  constructor(  private http: HttpClient,
                private messageService:MessageService){}

  /*getHeroes():Observable<Hero[]>{

    const heroes=of(HEROES);
    //this.messageService.add('HeroService: get all the heroes ')
    this.log(`get all the heroes`)
    return heroes;

  }*/
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
   // return this.http.get<Hero[]>(this.heroesUrl) //swapped of() for http.get() and the application keeps working without any other changes because both functions return an Observable<Hero[]>.
  
    return this.http.get<Hero[]>(this.heroesUrl)
    
    .pipe(
      tap(_=>this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }
  /*getHero(id:number):Observable<Hero>{
    const hero=HEROES.find(x=>x.id===id)!;
    //this.messageService.add(`HeroService: find the hero using id=${id}`);
    this.log(`find the hero using id=${id}`)
    return of(hero);


  }*/
  getHero(id:number):Observable<Hero>{
    const url=`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_=>this.log(`fetched a hero with id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }
  updateHero(hero:Hero):Observable<any>{

    return this.http.put(this.heroesUrl,hero,this.httpOptions)
           .pipe(
             tap(_=>this.log(`update hero id: ${hero.id}`)),
             catchError(this.handleError<any>('updateHero')) 
           );         

  }
    /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
    /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){

      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x=>x.length?this.log(`found heroes matching "${term}"`):this.log(`no hero for the matching "${term}"`)),
      catchError(this.handleError('seachHeroes',[]))
    );


  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}
