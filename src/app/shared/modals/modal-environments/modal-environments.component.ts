import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, select } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { getEnvironmentList } from 'src/app/store/selectors';
import { LocalService } from '../../services/local.service';
import { setApiEnv } from 'src/app/store/actions';

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
  environments$ = this.store.pipe(select(getEnvironmentList))

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalEnvironmentsComponent>,
    private localService: LocalService) {

  }

  close() {
    this.dialogRef.close()
  }

  selectEnvironment($event: string) {
    this.localService.setEnvironment($event)
    this.store.dispatch(setApiEnv({ environment: $event }))
    this.close();
  }

}
