import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  categoryList: Set<String> = new Set();
  budget: number = 0;
  newCat: string = undefined;
  newBudget: number = 0;
  alertMessage: any = undefined

  constructor(
    private expense: ExpenseService
  ) { }

  ngOnInit() {
    this.expense.getDetails()
      .subscribe((data: any) => {
        this.categoryList = new Set<String>(data.categories)
        this.budget = data.budget
        this.newBudget = this.budget
      })
  }

  addCategory(): void{
    if(this.newCat)
      this.expense.addCategory(this.newCat)
        .subscribe(() => {
          this.categoryList.add(this.newCat)
          this.newCat = undefined;
          this.showAlert('success', 'Category Added')
        }, (err) => {
          this.showAlert('red', 'Unable to add category. Please try again')
        })
  }

  updateBudget(): void{
    if (this.budget !== this.newBudget) 
      this.expense.updateBudget(this.newBudget)
        .subscribe(() => {
          this.budget = this.newBudget
          this.showAlert('success', 'Budget updated')
        }, (err) => {
          this.showAlert('red', 'Unable to update budget. Please try again')
        })
  }

  deleteCategory(category: string): void{
    let userConfirm = confirm('Are you sure you want to delete the category')
    if(userConfirm)
      this.expense.deleteCategory(category)
        .subscribe(() => {
          this.showAlert('success', "Category deleted successfully")
          this.categoryList.delete(category)
        })
  }

  showAlert(className: string, message: string): void{
    this.alertMessage = {
      class: className,
      message: message
    }
    setTimeout(() => this.alertMessage = undefined, 1500)
  }

}
