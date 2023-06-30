import { createAction, props } from "@ngrx/store";
import { NavigationItem } from "src/app/shared/interfaces/navigation-item";
import { Product } from "src/app/shared/interfaces/product";

export enum NavigationActionTypes {
    GET_ITEMS = '[NAVIGATIONITEMS][GET]',
    GET_ITEMS_SUCCESS = '[NAVIGATIONITEMS][GET] success',
    GET_ITEMS_FAILURE = '[NAVIGATIONITEMS][GET] failure',

    SELECT_ITEM = '[NAVIGATIONITEM][SELECT]',
    GET_ITEMS_FROM_SELECTED_PRODUCT = '[NAVIGATIONITEMFROMPRODUCT][GET]',
}

export const getNavigationItems = createAction(NavigationActionTypes.GET_ITEMS)
export const getNavigationItemsSuccess = createAction(
    NavigationActionTypes.GET_ITEMS_SUCCESS,
    props<{ items: NavigationItem[] }>())
    
export const getNavigationItemsFailure = createAction(
    NavigationActionTypes.GET_ITEMS_SUCCESS,
    props<{ error: any }>())

export const selectNavigationItem = createAction(
    NavigationActionTypes.SELECT_ITEM,
    props<{ item: NavigationItem }>())

export const getNavigationItemsFromProduct = createAction(
    NavigationActionTypes.GET_ITEMS_FROM_SELECTED_PRODUCT,
    props<{ product: Product }>())
