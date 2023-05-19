import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig, ModalConfigSize } from '../../interfaces/modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() public modalConfig?: ModalConfig
  ModalConfigSize = ModalConfigSize
  visible: boolean = false

  constructor() { }

  open() {
    this.visible = true
  }

  close() {
    this.visible = false
  }

  dismiss() {

  }

}
