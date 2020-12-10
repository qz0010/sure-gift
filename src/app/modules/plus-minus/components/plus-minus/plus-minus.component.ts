import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

export interface IPlusMinusData {
  value: number;
  sum: number;
  count: number;
  src: any;
  valueStep?: number;
}

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.styl']
})
export class PlusMinusComponent implements OnInit {
  @Input() source: any;
  @Input() count: number;
  @Input() valueStep: number;
  @Input() decrementValue = 0;
  @Input() value: number;
  @Input() max_count: number;
  @Input() max_value: number;
  @Input() disabled = false;
  @Input() showValue = true;
  @Input() currency = 'USD';
  @Input() mark: string;

  @Output() change: EventEmitter<IPlusMinusData> = new EventEmitter();
  @Output() increment: EventEmitter<IPlusMinusData> = new EventEmitter();
  @Output() decrement: EventEmitter<IPlusMinusData> = new EventEmitter();

  public sum = 0;
  public currentValue = 0;
  private holdInterval;
  private holdTimeOut;

  constructor(public device: DeviceDetectorService) {
  }

  ngOnInit() {
    this.currentValue = this.value;
  }

  onChange(type) {
    const currCount = this.count || 0;
    const resultCount = type === 1 ? currCount >= this.max_count ? currCount : currCount + 1 : currCount !== 0 ? currCount - 1 : 0;
    this.count = resultCount;
    this.sum = this.sum - (this.value * currCount - this.value * resultCount);

    if (type === 1) {
      if (
        !(this.max_value >= 0 && this.currentValue >= this.max_value)
      ) {
        this.currentValue += this.valueStep;
      }
    } else {
      this.currentValue > 0 ? this.currentValue -= this.valueStep : this.currentValue = 0;
    }
    const data = {
      value: this.currentValue,
      valueStep: this.valueStep,
      sum: this.sum,
      count: this.count,
      src: this.source
    };

    this.change.emit(data);

    if (type === 1) {
      this.increment.emit(data);
    } else if (type === 0 && (currCount !== 0 || this.valueStep)) {
      this.decrement.emit(data);
    }
  }

  onHoldUp() {
    clearTimeout(this.holdTimeOut);
    clearInterval(this.holdInterval);
  }

  onHold(type) {
    clearTimeout(this.holdTimeOut);
    clearInterval(this.holdInterval);
    this.holdTimeOut = setTimeout(() => {
      this.holdInterval = setInterval(() => {
        this.onChange(type);
      }, 100);
    }, 400);
  }
}
