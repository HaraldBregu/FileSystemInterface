import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
    withLatestFrom,
} from "rxjs";
import { NetworkService } from "src/app/shared/services/network.service";
import {
    addOrganisationIds,
    addOrganisationIdsFailure,
    addOrganisationIdsSuccess,
    deleteOrganisationIds,
    deleteOrganisationIdsFailure,
    deleteOrganisationIdsSuccess,
    getAllOrganizations,
    getAllOrganizationsByPartnerId,
    getAllOrganizationsFailure,
    getAllOrganizationsSuccess,
    getAssociatedOrganizations,
    getAssociatedOrganizationsFailure,
    getAssociatedOrganizationsSuccess,
    getPartnerId,
    getPartnerIdSuccess
} from "../actions";
import { Store, select } from "@ngrx/store";
import { selectedPartnerId } from "../selectors";

@Injectable()
export class OrganizationEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// ON GET PARTNERID SUCCESS
    /// GET ASSOCIATED ORGANIZATIONS
    getAssociatedOrganizationsOnGetPartnerIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerIdSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([_, partnerId]) => this.getAssociatedOrganizations$(partnerId))))

    /// ON ADD NEW ORGANISATIONS
    /// GET ASSOCIATED ORGANIZATIONS
    getAssociatedOrganizationsOnAddNewOrganisationsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(addOrganisationIdsSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([_, partnerId]) => this.getAssociatedOrganizations$(partnerId))))

    /// ON DELETE ORGANISATIONS
    /// GET ASSOCIATED ORGANIZATIONS
    getAssociatedOrganizationsOnDeleteOrganisationsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteOrganisationIdsSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([_, partnerId]) => this.getAssociatedOrganizations$(partnerId))))

    /// ON GET ALL ORGANIZATIONS BY PARTNER ID
    getAllOrganizationsFromPartnerIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getAllOrganizationsByPartnerId),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([_, partnerId]) => this.getAllOrganizations$(partnerId))))

    /// ON GET ALL ORGANIZATIONS
    getAllOrganizationsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getAllOrganizations),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([action, partnerId]) => this.getAllOrganizations$(partnerId, action.name, action.companyName))))

    /// ON ADDING ORGANIZATION IDS
    addOrganisationIdsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(addOrganisationIds),
        withLatestFrom(
            this.store.pipe(select(selectedPartnerId)),
        ),
        mergeMap(([action, partnerId]) => this.addOrganisationIds$(partnerId, action.ids))))

    /// ON DELETING ORGANIZATION IDS
    deleteOrganisationIdsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteOrganisationIds),
        mergeMap((action) => this.deleteOrganisationIds$(action.ids))))

    /// UTILS

    getAssociatedOrganizations$ = (partnerId: string) =>
        this.networkService.getAssociatedOrganizations(partnerId).pipe(
            map(result =>
                getAssociatedOrganizationsSuccess({ organizations: result })),
            catchError((error) =>
                of(getAssociatedOrganizationsFailure()))
        )

    getAllOrganizations$ = (partnerId: string, name?: string, companyName?: string) =>
        this.networkService.getAllOrganizations(partnerId, name ?? '', companyName ?? '').pipe(
            map(result =>
                getAllOrganizationsSuccess({ organizations: result })),
            catchError((error) =>
                of(getAllOrganizationsFailure()))
        )

    addOrganisationIds$ = (partnerId: string, ids: string[]) =>
        this.networkService.addOrganizations(partnerId, ids).pipe(
            map(result =>
                addOrganisationIdsSuccess()),
            catchError((error) =>
                of(addOrganisationIdsFailure()))
        )

    deleteOrganisationIds$ = (ids: string[]) =>
        this.networkService.deleteOrganizations(ids).pipe(
            map(result =>
                (deleteOrganisationIdsSuccess())),
            catchError((error) =>
                of(deleteOrganisationIdsFailure()))
        )

}