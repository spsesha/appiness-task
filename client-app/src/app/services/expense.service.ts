import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient
  ) { }

  addCategory(category: string): Observable<any>{
    return this.http.post('/api/expenses/add-category', {category: category})
  }

  getDetails(): Observable<any>{
    return this.http.get('/api/expenses');
  }

  updateBudget(budget: number): Observable<any>{
    return this.http.post('/api/expenses/update-budget', { budget: budget });
  }

  deleteCategory(category: string): Observable<any>{
    return this.http.post('/api/expenses/remove-category', { category: category });
  }

  getExpenses(page: number): Observable<any>{
    return this.http.get(`/api/expenses/get-expenses?page=${page}`);
  }

  addExpense(expense: any): Observable<any>{
    return this.http.post('/api/expenses/add-expense', expense);
  }

  getBudgetSummary(): Observable<any>{
    return this.http.get('/api/expenses/budget-summary');
  }

  getCategorySummary(): Observable<any>{
    return this.http.get('/api/expenses/category-summary');
  }

  updateExpense(expense: any): Observable<any>{
    return this.http.post('/api/expenses/update-expense', expense);
  }

}
