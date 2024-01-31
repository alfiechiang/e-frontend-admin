<template>
  <div id="product">
    <div class="search-area">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item label="商品名稱:">
          <el-input v-model="queryParams.product_name" style="width: 20vw" />
        </el-form-item>
        <el-form-item label="商品編號:">
          <el-input v-model="queryParams.product_number" style="width: 20vw" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getProductList"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="button-area">
        <el-button type="success" @click="openAddDialog">新增</el-button>
      </div>
      <el-table :data="productList" style="width: 100%" max-height="600px">
        <el-table-column prop="product_number" label="商品編號" />
        <el-table-column prop="product_name" label="名稱" />
        <el-table-column prop="price" label="價格" />
        <el-table-column prop="stock_num" label="庫存" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="medium" type="primary" @click="getProduct(scope.row.id)"
              >Edit</el-button
            >
            <el-button
              size="medium"
              type="primary"
              @click="openImageWallDialog(scope.row.id)"
              >照片牆</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pager">
      <el-pagination
        v-model:current-page="queryParams.page"
        page-size="10"
        :page-sizes="[10, 20, 30, 40]"
        background="false"
        layout="total, sizes, prev, pager, next, jumper"
        v-model:total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--  新增彈窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="新增商品"
      width="30vw"
      center
      align-center
    >
      <el-form :model="form" :inline="true" label-width="120px">
        <el-form-item label="商品種類:">
          <el-select
            v-model="form.category_id"
            class="m-2"
            placeholder="請選擇"
            size="large"
            style="width: 230px"
          >
            <el-option
              v-for="item in productCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名稱:">
          <el-input v-model="form.product_name" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品價格:">
          <el-input v-model="computedPrice" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品編號:">
          <el-input v-model="form.product_number" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品庫存:">
          <el-input v-model="form.stock_num" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input v-model="form.desc" style="width: 15vw" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 確定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!--  編輯彈窗 -->
    <el-dialog
      v-model="editdialogFormVisible"
      title="編輯商品"
      width="30vw"
      center
      align-center
    >
      <el-form :model="form" :inline="true" label-width="120px">
        <el-form-item label="商品種類:">
          <el-select
            v-model="form.category_id"
            class="m-2"
            placeholder="Select"
            size="large"
            style="width: 230px"
          >
            <el-option
              v-for="item in productCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品編號:">
          <el-input v-model="form.product_number" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品名稱:">
          <el-input v-model="form.product_name" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品價格:">
          <el-input v-model="computedPrice" style="width: 15vw" />
        </el-form-item>

        <el-form-item label="商品庫存:">
          <el-input v-model="form.stock_num" style="width: 15vw" />
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input v-model="form.desc" style="width: 15vw" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editdialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateProduct()"> 確定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!--  上傳彈窗 -->
    <el-dialog v-model="imageWallVisible">
      <el-upload
        v-model:file-list="fileList"
        action="http://127.0.0.1:8000/admin/product/img"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :data="uploadData"
        :on-success="successUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { ProductQuery, ProductList, ProductForm } from "@/api/product/product/types";
import type {
  ProductCategoryList,
  ProductCategoryForm,
} from "@/api/product/category/types";
import {
  getProductPage,
  addProduct,
  getProductAPI,
  updateProductAPI,
  getProductImgListAPI,
} from "@/api/product/product";
import { ProductCategoryListAPI } from "@/api/product/category";
import { useComputedPrice } from "@/utils/computed"; // 修改为正确的路径
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";

let dialogFormVisible = ref(false);
let editdialogFormVisible = ref(false);
let productID = ref<number>(0);

const productList = ref<ProductList[]>();
const productCategoryList = ref<ProductCategoryList[]>();

const total = ref(0);
const queryParams = ref<ProductQuery>({
  page: 1,
  per_page: 10,
  product_name: "",
  product_number: "",
});

const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url:
      "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const imageWallVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const uploadData = reactive({
  product_id: 1, // 初始时 product_id 为空，您可以根据需要设置它
});

const beforeUpload = () => {
  // 在这里，您可以设置或更新 product_id
  uploadData.product_id = productID.value; // 根据需要设置 product_id 的值
  return true; // 返回 true 继续上传
};

const successUpload = (res: any) => {
  fileList.value.push({
    name: res.fileName,
    url: res.img_url,
  });
};

const form = ref<ProductForm>({
  category_id: null,
  product_name: "",
  price: 0,
  product_number: "",
  stock_num: 1,
  desc: "",
});

const computedPrice = useComputedPrice(form);

const categoryForm = ref<ProductCategoryForm>({
  name: "",
});

onMounted(() => {
  resetQuery();
  getProductCategoryList();
});

function initialForm() {
  return {
    category_id: null,
    product_name: "",
    price: 0,
    product_number: "",
    stock_num: 1,
    desc: "",
  };
}

/** 重置查询 */
function resetQuery() {
  form.value = initialForm();
  getProductList();
}
function getProduct(productId: number) {
  editdialogFormVisible.value = true;
  productID.value = productId;
  getProductAPI(productId).then((res) => {
    form.value = res.data;
  });
}

function updateProduct() {
  updateProductAPI(form.value, productID.value).then((res) => {
    form.value = res.data;
  });
  editdialogFormVisible.value = false;
  resetQuery();
}

function getProductCategoryList() {
  ProductCategoryListAPI().then((res) => {
    productCategoryList.value = res.data;
  });
}

function getProductList() {
  getProductPage(queryParams.value).then((res) => {
    productList.value = res.data.data;
    total.value = res.data.total;
  });
}

async function handleSubmit() {
  await addProduct(form.value).then((res) => {});
  resetQuery();
  dialogFormVisible.value = false;
}

function openAddDialog() {
  dialogFormVisible.value = true;
  form.value = initialForm(); // 假设 initialForm 是返回初始表单值的函数
}

function openImageWallDialog(product_id: number) {
    imageWallVisible.value = true;
    productID.value = product_id;
    getProductImgListAPI(product_id).then((res) => {
        fileList.value = [];
        res.data.forEach((item: any) => {
            fileList.value.push({
                name: item.img_url,
                url: item.img_url,
            });
        });

    });
}

const handleCurrentChange = (val: number) => {
  getProductPage();
};
</script>
<style lang="scss" scoped>
#product {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .search-area {
    display: flex;
    width: 100%;
    height: 10vh;
    background: #fff;
    align-items: center;
  }

  .table-area {
    margin-top: 2vh;
    width: 100%;
    height: 75%;
    background-color: #fff;
    overflow: hidden;

    .button-area {
      margin: 10px 0 10px 10px;
    }
  }

  .pager {
    width: 100%;
    height: 7vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
