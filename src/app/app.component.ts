import { Component } from '@angular/core';
import { TestService } from './test.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nuevo';
  constructor(private ts:TestService){

    this.ts.getItems().subscribe((resp:any) => {
      console.log(resp);
    })

  }
}
