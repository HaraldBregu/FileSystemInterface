import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() inputId: string = "";
  @Input() inputValue: string = "";
  @Input() inputType: string = 'text';
  @Input() inputClass: string = 'form-control';
  @Input() inputPlaceholder: string = '';
  @Input() inputName: string = '';
  @Input() inputDisabled: boolean = false;
  @Input() inputReadonly: boolean = false;
  @Input() inputRequired: boolean = false;
  @Input() inputLabel: string = "";
  @Input() inputIcon: string = "";
  @Input() inputAutocomplete: boolean = true;
  @Input() min: string = '';
  @Input() max: string = '';

  //se valorizzato applica la validazione sull'input
  @Input() inputValidation?: string = undefined;

  @Output() onChange = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onFocusIn = new EventEmitter();
  @Output() onFocusOut = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.inputName !== '' && this.inputId === null) {
      this.inputId = this.inputName;
    }
  }
  
  onReset($event: any) {
    this.inputValue = "";
  }

}