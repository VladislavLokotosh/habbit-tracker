import {Component, OnInit, OnDestroy} from '@angular/core';
import {Habits} from "../../../assets/interfaces/habit";
import {Subscription} from "rxjs";
import {HabitServiceService} from "../../services/habit-service.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.scss'
})
export class HabitComponent implements OnInit, OnDestroy {
  habits!: Habits[];
  habitsSubscription!: Subscription;
  habitForm!: FormGroup;
  editingHabitId: number | null = null;
  editForms: { [key: number]: FormGroup } = {};

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
  startEditing(habit: Habits) {
    if (!habit.id) return; // Предотвращаем редактирование, если нет ID
    this.editingHabitId = habit.id;
    if (!this.editForms[habit.id]) {
      this.editForms[habit.id] = this.fb.group({ name: [habit.title, Validators.required] });
    }
  }


  saveEdit(habit: Habits) {
    if (habit.id && this.editForms[habit.id] && this.editForms[habit.id].valid) {
      const updatedHabit: Habits = { ...habit, title: this.editForms[habit.id].value.name };
      this.HabitServiceService.updateHabit(updatedHabit).subscribe(() => {
        const index = this.habits.findIndex(h => h.id === habit.id);
        if (index !== -1) Object.assign(this.habits[index], updatedHabit);
        this.editingHabitId = null;
        if (habit.id && this.editForms[habit.id]) {
          delete this.editForms[habit.id];
        }
      });
    }
  }



  cancelEdit() {
    this.editingHabitId = null;
  }

  removeHabit(id?: number) {
    if (id) {
      this.HabitServiceService.deleteHabit(id).subscribe(() => {
        this.habits = this.habits.filter(h => h.id !== id);
      });
    }
  }
}
