import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() datepickerLabel: string = "";
  @Input() datepickerId: string = "";
  @Input() datepickerName: string = "";
  @Input() datepickerPlaceholder: string = '';
  @Input() datepickerRequired = false;
  //@Input() datepickerValue: NgbDate | undefined;
  //@Input() datepickerMinDate: NgbDateStruct | undefined;
  //@Input() datepickerMaxDate: NgbDate | undefined;
  @Input() datepickerIsInvalid = false;
  @Input() isDisableWeekends: boolean = false;
  @Output() onDateSelect = new EventEmitter();
  invalidDate = false;
  datepickerValueFormat: string = "";
  errorMessage: string = "";
  markDisabled: Function | undefined;

  constructor(
    //public formatter: NgbDateParserFormatter,
    //public calendar: NgbCalendar,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    if (this.datepickerName !== '' && this.datepickerId === null) {
      this.datepickerId = this.datepickerName;
    }
    //this.errorMessage = this.v.groups.shared.format_not_allowed;

    // Disable weekends
    if (this.isDisableWeekends) {
      //this.markDisabled = (date: NgbDate) => { return this.calendar.getWeekday(date) >= 6 };
    }
  }

  setDate(date: any) {
    this.datepickerValueFormat = date.toString();

  }

  onSelect(date:any, datepicker:any) {
    console.log("onSelect-start");
    console.log(date);
    console.log("onSelect-end");
    //this.invalidDate = !(this.calendar.isValid(date));
    if (!this.invalidDate) {
      datepicker.classList.remove('is-invalid');
      this.datepickerValueFormat = moment(new Date(date.year, date.month - 1, date.day)).toString() //.format(this.dateFormat);
    }

    this.onDateSelect.emit(date);
  }

  onChangeDate($event:any) {
/*
    const date = this.formatter.parse($event.target.value);
    if ($event.target.value == null || $event.target.value == '') {
      this.invalidDate = false;
    } else {
      let dataVerificataEConvertitaInFromatoStringaValido = this.verifyAndConvertInFormatToNgbDate($event.target.value);
      const dateFormatoValido = this.formatter.parse(dataVerificataEConvertitaInFromatoStringaValido);
      console.log(dateFormatoValido);
      this.invalidDate = (!this.calendar.isValid(NgbDate.from(dateFormatoValido))
        || NgbDate.from(dateFormatoValido).before(this.datepickerMinDate)
        /|| NgbDate.from(dateFormatoValido).after(this.datepickerMaxDate));
    }*/
  }

  verifyAndConvertInFormatToNgbDate(dataFormatoStringa: string): string {
    let stringApp: string = dataFormatoStringa;
    if (!stringApp.includes("/")) {
      this.invalidDate = true;
      return "";
    } else {
      let stringData: string[] = stringApp.split("/");
      if (stringData[0].length < 4) {
        stringApp = stringData[2] + "-" + stringData[1] + "-" + stringData[0];
      }
      return stringApp;
    }
    return stringApp;
  }
}
