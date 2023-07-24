import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-typed-date-test';
  today = '2021-5-20';

  periodo = {
    dtFim: Date,
    dtInicio: Date
  };

}
