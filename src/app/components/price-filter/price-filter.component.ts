import { Component, model } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {

  max = model.required<number>();
  min = model.required<number>();

  onChangeValue() {
    const inputElements = document.querySelectorAll("input");

    inputElements.forEach(element => {
      element.addEventListener("input", () => {
        this.validateRange();
      })
    })
  }

  validateRange() {
    let minValue = document.querySelector('#min-value');
    let maxValue = document.querySelector('#max-value');

    let rangeFill = <HTMLElement>document.querySelector('.range-fill');
    const inputElements = document.querySelectorAll("input");

    let minPrice = parseInt(inputElements[0].value);
    let maxPrice = parseInt(inputElements[1].value);

    if (minPrice > maxPrice) {
      let temp = maxPrice;
      maxPrice = minPrice;
      minPrice = temp;
    }

    const minPercentage = ((minPrice - 10) / 9989) * 100;
    const maxPercentage = ((maxPrice - 10) / 9989) * 100;

    rangeFill!.style.left = minPercentage + '%';
    rangeFill!.style.width = maxPercentage - minPercentage + '%';

    minValue!.innerHTML = minPrice + '€';
    maxValue!.innerHTML = maxPrice + "€";
  }

  updateRange(minValue: number, maxValue: number) {
    if (minValue > maxValue) {
      [minValue, maxValue] = [maxValue, minValue]; // Swap values if min > max
    }

    this.min.set(minValue);
    this.max.set(maxValue);
  }

  onMinInput(e : Event) {
    const inputElement = <HTMLInputElement> e.target ;
    const minValue = inputElement.valueAsNumber;
    this.updateRange(minValue, this.max());
  }

  onMaxInput(e : Event) {
    const inputElement = <HTMLInputElement> e.target;
    const maxValue = inputElement.valueAsNumber;
    this.updateRange(this.min(), maxValue);
  }
}

