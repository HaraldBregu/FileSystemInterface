import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PartnerOperation } from '../interfaces/partner-operation';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openModalOrganisation: Subject<boolean> = new Subject()

  constructor(private store: Store) { }

  watchDisplay(): Observable<'open' | 'close'> {
    return this.display.asObservable()
  }

  watchModalOperation(): Observable<PartnerOperation | undefined> {
    return this.modalOperation.asObservable()
  }


  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close')
  private modalOperation: Subject<PartnerOperation | undefined> = new Subject()

  /*
  openModalOperation(operation: PartnerOperation | undefined) {
    this.display.next('open')

    if (operation?.partner_operation_id)
      this.store.dispatch(getPartnerOperationById({ operationId: operation.partner_operation_id }))

    this.modalOperation.next(operation)
  }*/

  close() {
    this.display.next('close')
  }

}
