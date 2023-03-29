import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProductProperty, PropertFieldType } from '../../interfaces/product-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Utils from 'src/app/core/utils';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent {
  @Input() title: string | undefined
  @Output() onToggleAccordion = new EventEmitter()

  detailFormGroup = new FormGroup({})

  collapsed: boolean = true

  @Input() set collapse(value: boolean) {
    this.collapsed = value
  }

  get collapse(): boolean {
    return this.collapsed;
  }

  propertyType: PropertFieldType | undefined
  prop: ProductProperty[] | undefined;
  PropertFieldType = PropertFieldType
  type: PropertFieldType = PropertFieldType.Text

  @Input() set properties(properties: ProductProperty[] | undefined) {
    this.prop = properties;

    /*
        this.detailFormGroup.addControl("baseproperties", new FormGroup({
          "firstname": new FormControl("nome"),
          "lastname": new FormControl("cognome")
        }))
        this.detailFormGroup.addControl("customproperties", new FormGroup({
          "firstname": new FormControl("nome 2"),
          "lastname": new FormControl("cognome 2")
        }))
        */
    this.prop?.forEach(property => {
      var tempFormGroup = new FormGroup({})

      property.childs.forEach(form => {
        //var validators = []
        //if (form.isrequired) { validators.push(Validators.required) }
        //validators.push(Validators.minLength(form.minlength))
        //validators.push(Validators.minLength(form.maxlength))
        //var formControl = new FormControl(form.value, validators)

        var formControl = new FormControl(form.value)

        var controlKey = form.name

        if (form.ismultilanguage) {
          controlKey = form.name + form.language
        } else {
          controlKey = form.name
        }

        tempFormGroup.addControl(controlKey, formControl);
      })

      this.detailFormGroup.addControl(property.name, tempFormGroup)
    })


    /*
        this.prop?.forEach(property => {
          var tempFormGroup = new FormGroup({})
    
          property.childs.forEach(form => {
            var validators = []
            if (form.isrequired) { validators.push(Validators.required) }
            validators.push(Validators.minLength(form.minlength))
            validators.push(Validators.minLength(form.maxlength))
            var formControl = new FormControl(form.value, validators)
    
            var controlKey = form.name
           
            if (form.ismultilanguage) {
              controlKey = form.language
            } else {
              controlKey = form.name
            }
            tempFormGroup.addControl(controlKey, formControl);
          })
          this.detailFormGroup.addControl(property.name, tempFormGroup)
        })*/

    /*
    if (this.prop != null) {
      for (var property of this.prop) {

        for (var form of property.childs) {

          var validators = []
          if (form.isrequired) { validators.push(Validators.required) }
          validators.push(Validators.minLength(form.minlength))
          validators.push(Validators.minLength(form.maxlength))
          var formControl = new FormControl(form.value, validators)

          var controlKey = undefined
          if (form.ismultilanguage) {
            controlKey = form.language
          } else {
            controlKey = form.name
          }

          this.detailFormGroup.addControl(controlKey, formControl);
        }
      }
    }*/
  }

  get properties(): ProductProperty[] | undefined {
    return this.prop;
  }


  constructor() {

  }

  toggleAccordion() {
    this.collapse = !this.collapsed
    this.onToggleAccordion.emit();
  }

  onSubmit() {
    console.log(this.detailFormGroup)
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onSubmitForm(myform: any) {
    console.log(myform)

  }

  flagFromLang(lang: string) {
    return "fi fi-" + Utils.codeLanguagesToCountryCode(lang)
  }
}
