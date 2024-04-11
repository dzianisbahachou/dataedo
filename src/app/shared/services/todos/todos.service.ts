import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {TodosInterface} from "../../interfaces/todos.interface";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
    constructor(private http: HttpClient) {}

    getTodos() {
        return this.http
            .get<TodosInterface[]>('https://gorest.co.in/public/v2/todos')
            .pipe(
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
