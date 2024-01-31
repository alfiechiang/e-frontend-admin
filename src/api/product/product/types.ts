

export interface ProductQuery {
    page: number;
    per_page: number;
    product_name:string,
    product_number:string
}

export interface ProductList {
    category_id: number;
    product_name: string;
    price: number;
    product_number: string;
    stock_num: number;
    desc: string;

}

export interface ProductForm {
    category_id :any
    product_name: string;
    price: number;
    product_number: string;
    stock_num: number;
    desc: string;
}