import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { SuiModalService, ModalTemplate, TemplateModalConfig, ModalSize } from 'ng2-semantic-ui';

export interface IContext{
  data: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<null, string, string>;
  budget: any = {budget: 0, expenseTotal: 0};
  category: any[] = [];
  categoryList: any[] = [];
  expenses: any[] = [];
  totalExpenses: number = 0;
  isEdit: boolean = false;
  modalData: any = {};

  constructor(
    private expense: ExpenseService,
    private modalService: SuiModalService
  ) { }

  ngOnInit() {
    this.callApis();
  }

  callApis(): void {
    this.expense.getBudgetSummary()
      .subscribe((data: any) => {
        this.budget = data
      })
    this.expense.getCategorySummary()
      .subscribe((data: any) => {
        this.category = data
      })
    this.pageChanged(1)
    this.expense.getDetails()
      .subscribe((data: any) => {
        this.categoryList = data.categories;
      })
  }

  pageChanged(page: any) {
    this.expense.getExpenses(page)
      .subscribe((data: any) => {
        this.expenses = data.expenses;
        this.totalExpenses = data.total_expense;
      })
  }

  openModal(expense: any = undefined, isEdit: boolean = false): void{
    this.isEdit = isEdit;
    if(isEdit)
      this.modalData = Object.assign({}, expense);
    else
      this.modalData = {}
    const config = new TemplateModalConfig<null, string, string>(this.modalTemplate)
    config.isClosable = false;
    config.size = ModalSize.Small;

    this.modalService
      .open(config)
      .onApprove(() => { this.saveData() })
      .onDeny(() => this.modalData = {})
  }

  saveData(): void{
    if(this.isEdit) {
      this.expense.updateExpense(this.modalData)
        .subscribe(() => this.callApis)
    } else {
      this.expense.addExpense(this.modalData)
        .subscribe(() => this.callApis())
    }
  }

}
