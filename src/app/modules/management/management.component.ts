import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { ModalOrganisationsComponent } from 'src/app/shared/modals/modal-organisations/modal-organisations.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  @ViewChild('modalOrganizations') modalOrganizations?: ModalOrganisationsComponent
  currentRoute?: string

  constructor(private router: Router, private route: ActivatedRoute, private modalService: ModalService) {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path
    })

    this.modalService.openModalOrganisation.subscribe(open => {
      if (open)
        this.modalOrganizations?.open()
      else
        this.modalOrganizations?.close()
    })

  }

  navigateToPartnerListPage() {
    this.router.navigate([
      '/management', {
        outlets: {
          'management-content': 'partner-detail'
        }
      }
    ])
  }

  navigateToRolesPage() {
    this.router.navigate([
      '/management', {
        outlets: {
          'management-content': 'roles-registry'
        }
      }
    ])

    /*
    this.router.navigate([
      '/management', 
      {
        outlets: {
          'management-content': 'roles-registry'
        }
      }
    ])*/

    // this.router.navigate(['/management/(management-content:partner-detail)'])
  }

}
