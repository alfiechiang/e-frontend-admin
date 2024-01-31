
export interface ProductCategoryQuery {
    page: number;
    per_page: number;
    name:string
}

export interface ProductCategoryForm {
    name: string;
}


export interface ProductCategoryList {
    id: number;
    name: string;
}

