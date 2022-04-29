import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DAS Jalapa';

  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
}
