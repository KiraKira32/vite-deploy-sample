<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">肚子好餓吃餅乾</span>
      <button type="button" class="btn">
        購物車
        <span class="badge bg-danger text-white"> {{ cart.length }} </span>
      </button>
    </div>
  </nav>
</template>

<script>
// 先前的Pinia是採用CDN的方式直接載入
// const { mapState } = Pinia;
// 現在的專案是改用 Vite 是使用 npm 的方式
import { mapState } from "pinia";
import cartStore from "../stores/cartStore.js";

export default {
  // 購物車顯示數量
  computed: {
    ...mapState(cartStore, ["cart"]),
  },
};
</script>
