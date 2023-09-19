import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
} from "rxjs";
import { NetworkService } from "src/app/shared/services/network.service";
import {
    createUpdatePartner,
    createUpdatePartnerFailure,
    createUpdatePartnerSuccess,
    deletePartnerId,
    deletePartnerIdFailure,
    deletePartnerIdSuccess,
    getPartnerId,
    getPartnerIdFailure,
    getPartnerIdSuccess,
    getPartners,
    getPartnersFailure,
    getPartnersSuccess
} from "../actions";
import { setApiEnv } from "src/app/store/actions";
import { Partner } from "src/app/shared/interfaces/partner";

@Injectable()
export class PartnerEffects {

    constructor(
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// ON GET PARTNERS
    getPartnersEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartners),
        mergeMap((data) => this.getPartners$(data.partnerName, data.partnerRoleId))
    ))

    /// ON DELETE PARTNER SUCCESS
    getPartnersAfterDeletingSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerIdSuccess),
        mergeMap((data) => this.getPartners$())
    ))

    /// ON CREATE/UPDATE PARTNER SUCCESS
    getPartnersAfterCreateOrUpdateSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(createUpdatePartnerSuccess),
        mergeMap((data) => this.getPartners$())
    ))

    /// ON GET PARTNER BY ID
    getPartnerIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerId),
        mergeMap((data) => this.getPartnerId$(data.partnerId))
    ))

    /// ON DELETE PARTNER BY ID
    deletePartnerIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerId),
        mergeMap((data) => this.deletePartnerId$(data.partnerId))
    ))

    /// GET ALL PARTNERS ON CHANGE ENVIRONMENT
    getPartnersOnChangeEnvEffect$ = createEffect(() => this.actions$.pipe(
        ofType(setApiEnv),
        mergeMap(() => this.getPartners$())))

    /// ON CREATE OR UPDATE PARTNER
    createUpdatePartnerEffect$ = createEffect(() => this.actions$.pipe(
        ofType(createUpdatePartner),
        mergeMap((data) => this.createOrUpdatePartner$(data.partner))))

    /// UTILS

    getPartners$ = (name?: string, roleid?: string) =>
        this.networkService.getPartners(name, roleid).pipe(
            map(result =>
                getPartnersSuccess({ partners: result })),
            catchError((error) =>
                of(getPartnersFailure())))

    getPartnerId$ = (id: string) =>
        this.networkService.getPartner(id).pipe(
            map(result =>
                getPartnerIdSuccess({ partner: result })),
            catchError((error) =>
                of(getPartnerIdFailure()))
        )

    deletePartnerId$ = (id: string) =>
        this.networkService.deletePartner(id).pipe(
            map(result =>
                deletePartnerIdSuccess()),
            catchError((error) =>
                of(deletePartnerIdFailure()))
        )

    createOrUpdatePartner$ = (partner: Partner) =>
        this.networkService.createOrUpdatePartner(partner).pipe(
            map(result =>
                createUpdatePartnerSuccess()),
            catchError((error) =>
                of(createUpdatePartnerFailure()))
        )
}