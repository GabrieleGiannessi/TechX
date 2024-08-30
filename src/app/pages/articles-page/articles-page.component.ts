import { Component } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [FilterButtonComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent {

}
