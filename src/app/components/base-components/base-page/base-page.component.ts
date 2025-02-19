import { Component } from '@angular/core';
import {HabitComponent} from "../../habbit/habit.component";


@Component({
  selector: 'base-page',
  standalone: true,
  imports: [
    HabitComponent

  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent {

}
