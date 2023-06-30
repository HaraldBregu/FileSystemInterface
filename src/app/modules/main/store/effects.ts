import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";


@Injectable()
export class MainEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

}
