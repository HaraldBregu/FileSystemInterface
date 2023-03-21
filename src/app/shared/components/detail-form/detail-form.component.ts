import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent {
  @Input() title: string | undefined;
  @Input() description?: string;

  collapse = true;
}
