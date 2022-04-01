import { Component } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';
import { HealthService } from './services/health.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-angular-observables';

  smartIsUp$: Observable<Boolean> = of(false);
  smartIsUp: Boolean = false;
  smartIsUpOnline$: Observable<Boolean> = of(false);


  constructor(
    private healthService: HealthService,
  ) {

    // creo el observable
    this.smartIsUp$ = healthService.healthSmarter()
      .pipe( // transformo
        map((data) => !!data ), // paso 1: devuelvo booleano que dice si existe o no
        catchError(() => {return of(false); }), // paso 2: devuelvo observable false si hay un error más arriba
      );

    // me subscribo
    this.smartIsUp$.subscribe(x => this.smartIsUp = x)

    // creo el segundo observable que se emite periódicamente
    this.smartIsUpOnline$ = healthService.healthSmarterOnline()
      .pipe( // transformo
        map((data) => !!data ), // paso 1: devuelvo booleano que dice si existe o no
        catchError(() => {return of(false); }), // paso 2: devuelvo observable false si hay un error más arriba
      );

  }

}
