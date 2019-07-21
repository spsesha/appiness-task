import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent implements OnInit, OnChanges {

  @Input() budget: any;
  percentage: string = '0';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.budget.budget !== 0)
      this.percentage = (this.budget.expenseTotal * 100 / this.budget.budget).toFixed(0);
    else
      this.percentage = '0';
  }

}
