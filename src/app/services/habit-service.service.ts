import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Habits} from "../../assets/interfaces/habit";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HabitServiceService {
  url = "http://localhost:3000/habits"

  constructor(private http: HttpClient) { }

  getHabits() {
    return this.http.get<Habits[]>(this.url);

  }
  getHabit(id: number) {
    return this.http.get<Habits>(`${this.url}/${id}`);
  }
  addHabit(habit: Habits): Observable<Habits> {
    return this.http.post<Habits>(this.url, habit);
  }
  updateHabit(habit: Habits): Observable<Habits> {
    return this.http.put<Habits>(`${this.url}/${habit.id}`, habit);
  }
  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
