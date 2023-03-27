import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
<<<<<<< HEAD
import { ProductProperty } from '../../interfaces/product-detail';
=======
>>>>>>> 86bb3b56a4b768ef27ab52753653571ddee85ca2

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent {
  @Input() title: string | undefined;
  @Input() properties: ProductProperty[] | undefined;

  @Output() onToggleAccordion = new EventEmitter();

  collapse = true;

  toggleAccordion() {
    this.onToggleAccordion.emit();
  }
}
