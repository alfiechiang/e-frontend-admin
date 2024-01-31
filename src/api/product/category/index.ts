import request from "@/utils/request";


import type { ProductCategoryQuery,ProductCategoryForm} from "./types";

/**
 * 商品種類分頁
 *
 * @param queryParams
 */
export function getProductCategoryPage(
    queryParams?: ProductCategoryQuery
  ){
    return request({
      url: "/admin/product/category",
      method: "get",
      params: queryParams,
    });
  }

  /**
 * 商品種類列表
 *
 * @param queryParams
 */
export function ProductCategoryListAPI(
  queryParams?: ProductCategoryQuery
){
  return request({
    url: "/admin/product/category",
    method: "get",
    params: queryParams,
  });
}


  export function getProductCategory(
    category_id?: number
  ){
    return request({
      url: "/admin/product/category/"+category_id+"/findone",
      method: "get",
    });
  }

  /**
 * 添加種類
 *
 * @param data
 */
export function addProductCategory(data: ProductCategoryForm) {
  return request({
    url: "/admin/product/category",
    method: "post",
    data: data,
  });
}



  /**
 * 更新種類
 *
 * @param data
 */
  export function updateProductCategory(data: ProductCategoryForm,category_id:number) {
    return request({
      url: "/admin/product/category/"+category_id,
      method: "put",
      data: data,
    });
  }


