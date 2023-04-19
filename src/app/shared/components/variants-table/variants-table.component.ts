import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Variant } from '../../interfaces/variant';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-variants-table',
  templateUrl: './variants-table.component.html',
  styleUrls: ['./variants-table.component.scss']
})
export class VariantsTableComponent implements OnChanges {
  @Input() variants: Variant[] = []
  variantFormGroup: FormGroup = new FormGroup({})
  headerVariant: Variant | undefined

  ngOnChanges(changes: SimpleChanges) {

    this.variants.forEach((variant, index) => {
      var tempFormGroup = new FormGroup({})

      variant.properties.forEach(property => {
        tempFormGroup.addControl(property.name, new FormControl(property.value, []))
      })

      this.variantFormGroup.addControl("variant" + index, tempFormGroup)
    })

    this.headerVariant = this.variants[0]

    console.log("variants prop")
    console.log(this.variants.length)
    console.log(JSON.stringify(this.variants))
    console.log("variants prop")
    console.log("variants form")
    console.log(JSON.stringify(this.variantFormGroup.value))

  }


}
