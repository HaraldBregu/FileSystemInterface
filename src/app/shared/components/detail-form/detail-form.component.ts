import { Component, Input } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent {
  @Input() title: string | undefined;
  @Input() description?: string;

  collapse = true;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);

  }
}
