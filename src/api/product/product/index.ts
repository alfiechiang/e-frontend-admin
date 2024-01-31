import request from "@/utils/request";
import type { ProductForm, ProductQuery } from "./types";



/**
 * 商品分頁
 *
 * @param queryParams
 */
export function getProductPage(
    queryParams?: ProductQuery
  ){

    return request({
      url: "/admin/product",
      method: "get",
      params: queryParams,
    });
  }



export function getProductAPI(
    product_id?: number
  ){
    return request({
      url: "/admin/product/"+product_id+"/findone",
      method: "get",
    });
}


 /**
 * 添加商品
 *
 * @param data
 */
 export function addProduct(data: ProductForm) {
  return request({
    url: "/admin/product",
    method: "post",
    data: data,
  });
}

/**
 * 更新產品
 *
 * @param data
 */
export function updateProductAPI(data: ProductForm,product_id:number) {
  return request({
    url: "/admin/product/"+product_id,
    method: "put",
    data: data,
  });
}

/**
 * 產品列表
 *
 * @param product_id
 */

export function getProductImgListAPI(product_id:number) {
  return request({
    url: "/admin/product/img",
    method: "get",
    params: {
      product_id: product_id
    }
  });
}
