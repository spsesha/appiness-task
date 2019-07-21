import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-category-split',
  templateUrl: './category-split.component.html',
  styleUrls: ['./category-split.component.scss']
})
export class CategorySplitComponent implements OnInit, OnChanges {

  @Input() category: any[] = [];

  @ViewChild('catCanvas') catCanvas: ElementRef;
  catContext: CanvasRenderingContext2D;
  canvasChart: any = undefined;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.canvasChart = undefined
    if(this.category.length <= 5) {
      let catCan = <HTMLCanvasElement> this.catCanvas.nativeElement;
      this.catContext = catCan.getContext('2d');
      if(this.category.length == 0) {
        this.catContext.font = '15px Arial';
        this.catContext.textAlign = 'center';
        this.catContext.fillText('No category to display', catCan.width/2, catCan.height/2)
      } else {
        this.canvasChart = new Chart(this.catContext,{
          type: 'pie',
          data: {
            labels: this.category.map(x => x._id),
            datasets: [{
              data: this.category.map(x => x.amount),
              backgroundColor: ['#183193', '#ea474f', '#90bef4', '#9d1fe0', '#30ac2e']
            }]
          },
          options: {
            legend: {
              position: 'right'
            },
            title: {
              display: true,
              text: 'Category wise split'
            }
          }
        })
      }
    }
  }


}
