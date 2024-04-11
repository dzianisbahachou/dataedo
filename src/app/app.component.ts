import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

import { map } from "rxjs";

import {TodosService} from "./shared/services/todos/todos.service";
import {TodosErrorMessage, TodosInterface} from "./shared/interfaces/todos.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todo: any = null
  loading: boolean = false

  constructor(private todosService: TodosService) {
  }
  getSecondTodo(): void {
    this.loading = true
    this.todosService.getTodos()
      .pipe(
          map((todo: TodosInterface[] | null): TodosInterface | string | void => {
            if (todo) {
              if (todo.length >= 2) {
                return todo.filter(todo => todo.status === 'pending')[1]
              } else if (todo.length === 1){
                return TodosErrorMessage.LESS_THAN_REQUIRED_TODOS
              } else if (todo.length === 0) {
                return TodosErrorMessage.NO_TODOS
              }
            }
          })
      )
      .subscribe((todo) => {
        this.todo = todo
        this.loading = false
      })
  }
}
