<template>
  <div class="bg-light my-4 p-4">
    <div v-if="!cartList.newCarts.length">購物車沒有任何的品項</div>
    <table v-else class="table align-middle">
      <tbody>
        <tr v-for="item in cartList.newCarts" :key="item.id">
          <td>
            <a
              href="#"
              class="text-dark"
              @click.prevent="removeCartItem(item.id)"
              >x</a
            >
          </td>
          <td>
            <img
              :src="item.product.imageUrl"
              class="table-image"
              alt="巧克力餅乾"
            />
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <select
              name=""
              id=""
              class="form-select"
              :value="item.qty"
              @change="(evt) => setCartQty(item.id, evt)"
            >
              <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
            </select>
          </td>
          <td class="text-end">$ {{ item.subtotal }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import cartStore from "../stores/cartStore.js";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(cartStore, ["cartList"]), // cartList:列表＆總金額
  },
  methods: {
    ...mapActions(cartStore, ["removeCartItem", "setCartQty"]),
  },
};
</script>
