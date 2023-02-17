// CartStore是專門管理購物車的所有方法
// 使用 const 取出defineStore

// const { defineStore } = Pinia;
import { defineStore } from "Pinia";

// 匯入 productsStore
import productsStore from "./productsStore.js";
// 在使用 export default 匯入 defineStore的方法
// 後面代入兩個參數，一個是Store名稱、一個是加入物件的名稱
export default defineStore("cart", {
  // methods 方法
  // actions (Pinia用法)
  state: () => ({
    // 加入購物車的資料
    cart: [],
  }),
  actions: {
    // 代入兩個參數，一個是產品的id一個是產品的數量
    addToCart(productId, qty = 1) {
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目會累加 (+1)，若沒有則會新增一個購物項目
      const currentCart = this.cart.find(
        (item) => item.productId === productId
      );
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        // 加入cart[]產品的id以及數量
        this.cart.push({
          // 為產品添加 id(日期與戳記時間)
          id: new Date().getTime(),
          productId,
          qty,
        });
      }
      console.log(this.cart);
    },

    //  選項值累加
    setCartQty(id, event) {
      console.log(id, event);
      const currentCart = this.cart.find((item) => item.id === id);
      console.log(currentCart);
      currentCart.qty = event.target.value * 1;
    },

    // 刪除產品列表
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => item.id === id);
      this.cart.splice(index, 1);
    },
  },
  // 購物車的列表
  getters: {
    cartList: ({ cart }) => {
      // 1. 購物車的品項資訊，需要整合產品的資訊
      // 2. 必須計算小記的金額
      // 3. 必須提供總金額

      // 使用解構的方式從 products 取出產品列表
      const { products } = productsStore();
      const newCarts = cart.map((item) => {
        // 單一產品取出
        const product = products.find(
          (product) => product.id === item.productId
        );
        return {
          ...item,
          product,
          subtotal: product.price * item.qty, // 小記的總金額
        };
      });

      const total = newCarts.reduce((a, b) => a + b.subtotal, 0);

      return {
        newCarts, //列表
        total,
      };
    },
  },
});
