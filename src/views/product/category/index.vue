<template>
  <div id="productCategory">
    <div class="search-area">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item label="種類名稱:">
          <el-input v-model="queryParams.name" style="width:10vw;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getCategoryPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="button-area">
        <el-button type="success" @click="dialogFormVisible=true">新增</el-button>
      </div>
      <el-table :data="productCategoryList" style="width: 100%" max-height="600px">
        <el-table-column prop="id" label="種類ID" width="350" />
        <el-table-column prop="name" label="種類名稱" width="700" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="medium" type="primary" @click="getCategory(scope.row.id)" >Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination v-model:current-page="queryParams.page" page-size="10" :page-sizes="[10, 20, 30, 40]"
        background="false" layout="total, sizes, prev, pager, next, jumper" v-model:total="total"
        @current-change="handleCurrentChange" />
    </div>

  <!--  新增彈窗 -->
    <el-dialog v-model="dialogFormVisible" title="種類名稱" width="30vw" center align-center>
        <el-form :model="form" :inline="true" label-width="120px">
          <el-form-item label="種類名稱:">
            <el-input v-model="form.name" style="width:15vw;" />
          </el-form-item>
        </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            確定
          </el-button>
        </span>
      </template>
    </el-dialog>
  <!--  編輯彈窗 -->
  <el-dialog  v-model="editDialogFormVisible" title="種類名稱" width="30vw" center align-center>
    <el-form :model="form" :inline="true" label-width="120px">
      <el-form-item label="種類名稱:">
        <el-input v-model="form.name" style="width:15vw;" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="update">
          確定
        </el-button>
      </span>
    </template>
  </el-dialog>


</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {  addProductCategory, getProductCategoryPage,getProductCategory,updateProductCategory} from "@/api/product/category";
import type { ProductCategoryQuery,ProductCategoryList,ProductCategoryForm } from '@/api/product/category/types';
let dialogFormVisible = ref(false);
let editDialogFormVisible = ref(false);
const total = ref(0);
let categoryID = ref<number>(0);

const productCategoryList = ref<ProductCategoryList[]>();
const form = ref<ProductCategoryForm>({
  name: '',
});

const queryParams = ref<ProductCategoryQuery>({
  page: 1,
  per_page: 10,
  name:''
});

onMounted(() => {
  getCategoryPage();
})

function initialForm() {
    return {
        name:''
    };
}

/** 重置查询 */
function resetQuery() {
  form.value= initialForm();
  getCategoryPage();

}

function getCategoryPage() {

  getProductCategoryPage(queryParams.value).then((res)=>{
    productCategoryList.value =res.data.data
    total.value = res.data.total;
  });
}

function getCategory(categoryId: number) {

  getProductCategory(categoryId).then((res)=>{
    form.value=res.data;
    categoryID.value=categoryId;
    editDialogFormVisible.value=true;
  })

}

async function  update() {
  await updateProductCategory(form.value,categoryID.value).then((res)=>{
  })
  resetQuery();
  editDialogFormVisible.value = false;
}

async function  handleSubmit() {
  await addProductCategory(form.value).then((res)=>{
  })
  resetQuery();
  dialogFormVisible.value = false;
}

const handleCurrentChange = (val: number) => {
  getCategoryPage();
}


</script>
<style lang="scss" scoped>
#productCategory {

  width: 100%;
  height: 100%; /*设置最小高度*/
  overflow: hidden;
  
  .search-area {
    width: 100%;
    height: 10vh;
    background: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .table-area {
    background: #fff;
    width: 100%;
    height: 70vh;
    padding: 0px 10px 10px 10px;


    .button-area {
      width: 100%;
      height: 5vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid #E5E7ED;
    }
  }

  .pager {
    width: 100%;
    height:7vh;
    background: #fff;

     display: flex;
     align-items: center;
     justify-content: center;
  }

}
</style>