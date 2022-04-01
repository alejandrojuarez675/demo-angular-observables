import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class HealthService {

  constructor(
    private http: HttpClient
  ) { }

  healthSmarter(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/health'); // esto ya deevuelve un observable
  }

  healthSmarterOnline(): Observable<any> {
    return interval(10000) // cada 10 seg emito
      .pipe( // arranco la transformacion
        switchMap(() => this.healthSmarter()), // paso 1: devuelvo como observable lo que devuelve la otra func
      );
  }

}
