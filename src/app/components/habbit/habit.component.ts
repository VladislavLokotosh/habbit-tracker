import {Component, OnInit, OnDestroy} from '@angular/core';
import {Habits} from "../../../assets/interfaces/habit";
import {Subscription} from "rxjs";
import {HabitServiceService} from "../../services/habit-service.service";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.scss'
})
export class HabitComponent implements OnInit, OnDestroy {
  habits!: Habits[];
  habitsSubscription!: Subscription;
  habitForm!: FormGroup;

  constructor(private fb: FormBuilder, private HabitServiceService: HabitServiceService) {
    this.habitForm = this.fb.group({
      name: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.habitsSubscription = this.HabitServiceService.getHabits().subscribe((data)=>{
      this.habits=data
    })
  }
  ngOnDestroy() {
    if (this.habitsSubscription) this.habitsSubscription.unsubscribe();
  }

  addHabit() {
    if (this.habitForm.valid) {
      const newHabit: Habits = { title: this.habitForm.value.name, completedDays: 0 };
      this.HabitServiceService.addHabit(newHabit).subscribe(habit => {
        this.habits.push(habit);
        this.habitForm.reset();
      });
    }
  }

  completeDay(habit: Habits) {
    habit.completedDays++;
    this.HabitServiceService.updateHabit(habit).subscribe();
  }

  removeHabit(id?: number) {
    if (id) {
      this.HabitServiceService.deleteHabit(id).subscribe(() => {
        this.habits = this.habits.filter(h => h.id !== id);
      });
    }
  }
}
