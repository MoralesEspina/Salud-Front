import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DAS Jalapa';
  statusfilter: string="";

  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
}
