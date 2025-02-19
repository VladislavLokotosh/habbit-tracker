import { Routes } from '@angular/router';
import {BasePageComponent} from "./components/base-components/base-page/base-page.component";
import {StatsComponent} from "./components/stats/stats.component";
import {HabitComponent} from "./components/habbit/habit.component";

export const routes: Routes = [
  {
    path: '', component: BasePageComponent
  },
  {
    path: 'habits', component: HabitComponent
  },
  {
    path: 'stats', component: StatsComponent
  },
  {
    path: '**', redirectTo: '', component:BasePageComponent, pathMatch: 'full',
  },
];
