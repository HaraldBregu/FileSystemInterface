import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductDetail } from '../interfaces/product-detail';
import { ProductAssociation } from '../interfaces/product-association';
import { SearchData } from '../interfaces/search-data';
import { SearchDataResult } from '../interfaces/search-data-result';
import { NavigationItem } from '../interfaces/navigation-item';
import { Partner } from '../interfaces/partner';
import { PartnerRole } from '../interfaces/partner-role';
import { Organization } from '../interfaces/organization';
import { PartnerOperation } from '../interfaces/partner-operation';
import { PartnerRoleOperation } from '../interfaces/partner-role-operation';
import { DefinitionName } from '../interfaces/definition-name';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  getEnvironmentVariables(): Observable<any[]> {
    return this.httpClient.get<any[]>('/CommerceWebApi/Api/Catalog/GetEnvironments')
  }

  getCatalogs(): Observable<Product[]> {
    var path = "/CommerceWebApi/Api/Catalog/GetCatalogList"
    return this.httpClient.get<Product[]>(path)
  }

  getProducts(catalogName: string, categoryId?: number): Observable<Product[]> {
    var path = ""
    if (categoryId) {
      path = "/CommerceWebApi/Api/Catalog/GetCategoryElements?catalogName=" + catalogName + "&id=" + categoryId
    } else {
      path = "/CommerceWebApi/Api/Catalog/GetCatalogElements?catalogName=" + catalogName
    }
    return this.httpClient.get<Product[]>(path);
  }

  getProductDetailInfo(catalogName: string, categoryId?: number): Observable<[ProductDetail, ProductAssociation?]> {
    const isNotCatalog = categoryId !== null && categoryId !== undefined
    var productDetailPath = "/CommerceWebApi/Api/Catalog/GetCatalogProperties?catalogName=" + catalogName
    productDetailPath += isNotCatalog ? "&id=" + categoryId : ''
    var productAssociationPath = "/CommerceWebApi/Api/Catalog/GetEntityAssociations?catalogName=" + catalogName + "&id=" + categoryId

    const productDetailService = this.httpClient.get<ProductDetail>(productDetailPath)

    return isNotCatalog ?
      forkJoin([
        productDetailService,
        this.httpClient.get<ProductAssociation>(productAssociationPath)
      ]) :
      forkJoin([
        productDetailService
      ])

  }

  getProductDetail(catalogName: string, categoryId?: number): Observable<ProductDetail> {
    var path = ""
    if (categoryId) {
      path = "/CommerceWebApi/Api/Catalog/GetEntityProperties?catalogName=" + catalogName + "&id=" + categoryId
    } else {
      path = "/CommerceWebApi/Api/Catalog/GetCatalogProperties?catalogName=" + catalogName
    }
    return this.httpClient.get<ProductDetail>(path);
  }

  postProductDetail(data: ProductDetail, isCatalog: boolean = true): Observable<string> {
    var path = "/CommerceWebApi/Api/Catalog"
    if (isCatalog) {
      path += "/SaveCatalogProperties"
    } else {
      path += "/SaveEntityProperties"
    }
    return this.httpClient.post<string>(path, data)
  }

  getProductAssociation(catalogName: string, categoryId: number): Observable<ProductAssociation> {
    var path = "/CommerceWebApi/Api/Catalog/GetEntityAssociations?catalogName=" + catalogName + "&id=" + categoryId
    return this.httpClient.get<ProductAssociation>(path)
  }

  postProductAssociation(data: ProductAssociation): Observable<string> {
    var path = "/CommerceWebApi/Api/Catalog/SaveEntityAssociation"
    return this.httpClient.post<string>(path, data);
  }

  getSearchData(catalogName?: string, categoryId?: number, type?: string): Observable<SearchData> {
    const baseUrl = "/CommerceWebApi/Api/Catalog/GetSearch"

    if (catalogName && categoryId) {
      var path = baseUrl + "?catalogName=" + catalogName + "&id=" + categoryId + "&lookforselected=" + type
      return this.httpClient.get<SearchData>(path);
    } else if (catalogName) {
      var path = baseUrl + "?catalogName=" + catalogName
      return this.httpClient.get<SearchData>(path);
    }

    return this.httpClient.get<SearchData>(baseUrl);
  }

  postSearchData(searchData: SearchData): Observable<SearchDataResult[]> {
    const path = "/CommerceWebApi/Api/Catalog/GetResults"
    return this.httpClient.post<SearchDataResult[]>(path, searchData);
  }

  getNavigationList(catalogName: string, id?: number): Observable<NavigationItem[]> {
    const baseUrl = "/CommerceWebApi/Api/Catalog/GetNavigation?catalogName=" + catalogName
    const path = id ? baseUrl + "&id=" + id : baseUrl
    return this.httpClient.get<NavigationItem[]>(path);
  }

  getPartnerRoles(type: string): Observable<PartnerRole[]> {
    return this.httpClient.get<PartnerRole[]>('/CommerceWebApi/Api/Profile/GetRoles?type=' + type);
  }

  getPartners(partnerName?: string, partnerRoleId?: string): Observable<Partner[]> {
    const name = partnerName ?? ''
    const id = partnerRoleId ?? ''
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerResults?name=' + name + '&partnerRoleId=' + id
    return this.httpClient.get<Partner[]>(urlString);
  }

  getPartner(id: string): Observable<Partner> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerById?id=' + id
    return this.httpClient.get<Partner>(urlString)
  }

  deletePartner(id: string): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/DeletePartnerById?id=' + id
    return this.httpClient.get<string>(urlString)
  }

  createOrUpdatePartner(partner: Partner): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/SavePartner'
    return this.httpClient.post<string>(urlString, partner)
  }

  getAssociatedOrganizations(partnerId: string): Observable<Organization[]> {
    const urlString = '/CommerceWebApi/Api/Profile/GetOrganizationsAssociated?partnerNumber=' + partnerId
    return this.httpClient.get<Organization[]>(urlString)
  }

  getAllOrganizations(partnerId: string, name: string, companyName: string): Observable<Organization[]> {
    const urlString = '/CommerceWebApi/Api/Profile/GetOrganizationsResults?partnerNumber=' + partnerId + '&name=' + name + '&companyName=' + companyName
    return this.httpClient.get<Organization[]>(urlString)
  }

  addOrganizations(partnerId: string, ids: string[]): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/AddOrganizations?partnerNumber=' + partnerId
    return this.httpClient.post<string>(urlString, ids)
  }

  deleteOrganizations(ids: string[]): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/RemoveOrganizations'
    return this.httpClient.post<string>(urlString, ids)
  }

  /// PARTNER ROLE REGISTRY

  getRolesRegistry(): Observable<PartnerRole[]> {
    const urlString = '/CommerceWebApi/Api/Profile/GetRolesRegistry'
    return this.httpClient.get<PartnerRole[]>(urlString)
  }

  getPartnerRoleById(roleId: string): Observable<PartnerRole> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerRoleById?id=' + roleId
    return this.httpClient.get<PartnerRole>(urlString)
  }

  deleteRoleRegistryById(roleId: string): Observable<PartnerRole> {
    const urlString = '/CommerceWebApi/Api/Profile/DeleteRoleById?id=' + roleId
    return this.httpClient.get<PartnerRole>(urlString)
  }

  createPartnerRole(partnerRole: PartnerRole): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/SaveInsertPartnerRole'
    return this.httpClient.post<string>(urlString, partnerRole)
  }

  updatePartnerRole(partnerRole: PartnerRole): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/SaveUpdatePartnerRole'
    return this.httpClient.post<string>(urlString, partnerRole)
  }

  /// PARTNER OPERATIONS

  getPartnerOperations(): Observable<PartnerOperation[]> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerOperations'
    return this.httpClient.get<PartnerOperation[]>(urlString)
  }

  getPartnerOperationById(operationId: string): Observable<PartnerOperation> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerOperationById?Id=' + operationId
    return this.httpClient.get<PartnerOperation>(urlString)
  }

  deletePartnerOperationById(operationId: string): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/DeletePartnerOperationById?Id=' + operationId
    return this.httpClient.get<string>(urlString)
  }

  savePartnerOperation(operation: PartnerOperation): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/SavePartnerOperation'
    return this.httpClient.post<string>(urlString, operation)
  }

  /// PARTNER ROLE OPERATIONS

  getPartnerRoleOperations(): Observable<PartnerRoleOperation[]> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerRoleOperations'
    return this.httpClient.get<PartnerRoleOperation[]>(urlString)
  }

  getPartnerRoleOperationById(id: string): Observable<PartnerRoleOperation> {
    const urlString = '/CommerceWebApi/Api/Profile/GetPartnerRoleOperationById?Id=' + id
    return this.httpClient.get<PartnerRoleOperation>(urlString)
  }

  deletePartnerRoleOperationById(id: string): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/DeletePartnerRoleOperationById?Id=' + id
    return this.httpClient.get<string>(urlString)
  }

  savePartnerRoleOperation(roleOperation: PartnerRoleOperation): Observable<string> {
    const urlString = '/CommerceWebApi/Api/Profile/SavePartnerRoleOperation'
    return this.httpClient.post<string>(urlString, roleOperation)
  }

  getDefinitionNames(catalogName: string, type: string): Observable<DefinitionName[]> {
    const urlString = '/CommerceWebApi/Api/Catalog/GetDefinitionName?catalogName=' + catalogName + "&type=" + type
    return this.httpClient.get<DefinitionName[]>(urlString)
  }

  addEntity(catalogName: string, definitionName: string, classtype: string, parentoid: number, displayname: string): Observable<string> {
    const urlString = `/CommerceWebApi/Api/Catalog/AddEntity?catalogName=${catalogName}&definitionname=${definitionName}&classtype=${classtype}&parentoid=${parentoid}&displayname=${displayname}`
    return this.httpClient.get<string>(urlString)
  }

  deleteEntity(catalogName: string, oid: number): Observable<string> {
    const urlString = `/CommerceWebApi/Api/Catalog/DeleteEntity?catalogName=${catalogName}&oid=${oid}`
    return this.httpClient.get<string>(urlString)
  }

  getEmptyVariant(catalogName: string, id: number): Observable<ProductDetail> {
    const urlString = `/CommerceWebApi/Api/Catalog/GetEntityPropertiesForEmptyVariants?catalogName=${catalogName}&id=${id}`
    return this.httpClient.get<ProductDetail>(urlString)
  }

  createVariantProperties(property: ProductDetail): Observable<string> {
    const urlString = `/CommerceWebApi/Api/Catalog/InsertEntityVariantProperties`
    return this.httpClient.post<string>(urlString, property)
  }

  deleteVariant(catalogName: string, variantId: string): Observable<string> {
    const urlString = `/CommerceWebApi/Api/Catalog/DeleteVariant?catalogname=${catalogName}&variantid=${variantId}`
    return this.httpClient.get<string>(urlString)
  }

}
