import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfig } from 'src/app/core/interfaces/modal-config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-modal-environments',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './modal-environments.component.html',
  styleUrls: ['./modal-environments.component.scss']
})
export class ModalEnvironmentsComponent {
  @Output() onSelectEnvironment = new EventEmitter<String>()
  visible: boolean = false
  environments: string[] = []
  
  constructor(private store: Store) {
    
  }

  open(environments: string[]) {
    this.visible = true
    this.environments = environments
  }

  close() {
    this.visible = false
  }

  selectEnvironment($event: string) {
    this.onSelectEnvironment.emit($event)
  }

}
