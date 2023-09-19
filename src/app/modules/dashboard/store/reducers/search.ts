import { createReducer, on } from "@ngrx/store";
import {
    SearchPostField,
    searchDataPostFieldEmpty
} from "src/app/shared/interfaces/search-data";
import { searchDataStateInitial } from "../states";
import {
    addSearchDataPostFieldEmptyCondition,
    getCatalogs,
    getSearchData,
    getSearchDataFailure,
    getSearchDataForCatalog,
    getSearchDataForSelectedProduct,
    getSearchDataResult,
    getSearchDataResultFailure,
    getSearchDataResultSuccess,
    getSearchDataSuccess,
    searchDataPostFieldRemoveConditionAtIndex,
    selectSearchResult,
    setSearchDataLookFor,
    setSearchDataPostField,
    setSearchDataPostFieldConditionAtIndex,
    setSearchDataPostFieldNameAtIndex,
    setSearchDataPostFieldOperatorAtIndex,
    setSearchDataPostFieldValueAtIndex
} from "../actions/actions";

export const searchReducer = createReducer(
    searchDataStateInitial,

    on(getCatalogs, (state) => ({
        ...searchDataStateInitial,
    })),

    on(getSearchData, (state) => ({
        ...state,
        loading: true,
        searchDataResult: [],
    })),

    on(getSearchDataForSelectedProduct, (state) => ({
        ...state,
        loading: true,
        searchDataResult: [],
    })),

    on(getSearchDataForCatalog, (state) => ({
        ...state,
    })),

    on(getSearchDataSuccess, (state, data) => ({
        ...state,
        loading: false,
        searchData: {
            ...data.searchData,
            lookforselected: data.searchData.lookforoptions[0].value,
            postfields: [
                searchDataPostFieldEmpty
            ],
        },
    })),

    on(getSearchDataFailure, (state, data) => ({
        ...state,
        loading: false,
    })),

    on(setSearchDataLookFor, (state, data) => {
        if (!state.searchData)
            return { ...state }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                lookforselected: data.value
            },
        }
    }),

    on(setSearchDataPostFieldNameAtIndex, (state, data) => {
        if (!state.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [
            ...state.searchData.postfields,
        ]
        updatedPostFields[data.index] = {
            ...updatedPostFields[data.index],
            field: data.fieldName,
            fieldtype: data.fieldType,
        }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: updatedPostFields,
            },
        }
    }),

    on(setSearchDataPostFieldConditionAtIndex, (state, data) => {
        if (!state.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], condition: data.condition }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: updatedPostFields,
            }
        }
    }),

    on(setSearchDataPostFieldOperatorAtIndex, (state, data) => {
        if (!state.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], logicaloperator: data.operator }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: updatedPostFields,
            },
        }
    }),

    on(setSearchDataPostFieldValueAtIndex, (state, data) => {
        if (!state.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], value: data.fieldValue, }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: updatedPostFields,
            },
        }
    }),

    on(addSearchDataPostFieldEmptyCondition, (state, data) => {
        if (!state.searchData)
            return { ...state }

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: [
                    ...state.searchData.postfields,
                    searchDataPostFieldEmpty
                ],
            }
            ,
        }
    }),

    on(searchDataPostFieldRemoveConditionAtIndex, (state, data) => {
        if (!state.searchData)
            return { ...state }

        var newArray = [...state.searchData.postfields]
        newArray.splice(data.index, 1)

        return {
            ...state,
            searchData: {
                ...state.searchData,
                postfields: newArray,
            },
        }
    }),

    on(setSearchDataPostField, (state, data) => ({
        ...state,
    })),

    on(getSearchDataResult, (state, data) => ({
        ...state,
        loading: true,
        searchDataResult: [],
        searchDataSelectedResult: undefined,
    })),

    on(getSearchDataResultSuccess, (state, data) => ({
        ...state,
        loading: false,
        searchDataResult: data.resultList,
    })),

    on(getSearchDataResultFailure, (state, data) => ({
        ...state,
        loading: false,
        searchDataResult: [],
    })),

    on(selectSearchResult, (state, data) => ({
        ...state,
        searchDataSelectedResult: data.searchDataResult,
    })),

)