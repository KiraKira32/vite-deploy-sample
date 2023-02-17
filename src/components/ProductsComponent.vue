<template>
  <div class="row row-cols-3 my-4 g-4">
    <div class="col" v-for="product in sortProducts" :key="product.id">
      <div class="card">
        <img :src="product.imageUrl" class="card-img-top" alt="圖片" />
        <div class="card-body">
          <h6 class="card-title">
            {{ product.title }}
            <span class="float-end">$ {{ product.price }}</span>
          </h6>
          <a
            href="#"
            class="btn btn-outline-primary w-100"
            @click.prevent="addToCart(product.id)"
            >加入購物車</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入 Store
import productsStore from "../stores/productsStore.js";
import cartStore from "../stores/cartStore.js";
import CardComponet from "./CardComponet.vue";
// 使用 const 將 Pinia 的方法匯入
// mapState是取用多個方法
import { mapState, mapActions } from "Pinia";

export default {
  computed: {
    // 用展開的方式取出對應的資料(productsStore)，陣列代入的名稱是(productsStore裡的getters名稱)
    ...mapState(productsStore, ["sortProducts"]),
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
  },
  components: {
    CardComponet,
  },
};
</script>
