<template>
  <q-page :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }" class="studios-page">
    <div v-if="cartItems.length" class="cart-items">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="cart-item"
        :class="{ 'cart-item-dark': $q.dark.isActive, 'cart-item-light': !$q.dark.isActive }"
      >
        <q-img
          :src="item.AftercareProductImage"
          :alt="item.AftercareProductName"
          class="cart-item-image"
        />
        <div class="cart-item-info">
          <h3>{{ item.AftercareProductName }}</h3>
          <p>{{ (item.AftercareProductPrice * item.quantity).toFixed(2) }} €</p>
        </div>
        <div class="cart-item-quantity">
          <q-btn flat round icon="remove" @click="decreaseQuantity(index)" />
          <p>{{ item.quantity }}</p>
          <q-btn flat round icon="add" @click="increaseQuantity(index)" />
        </div>
        <q-btn
          icon="delete"
          color="negative"
          @click="removeFromCart(index)"
          flat
        />
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>{{ $t('cartPage.emptyCart')}}</p>
    </div>
    <div v-if="cartItems.length" class="cart-summary">
      <p><span>{{ $t('cartPage.sumLabel')}}</span>{{ totalCost.toFixed(2) }} €</p>
      <div class="cart-actions">
        <q-btn flat :label="$t('cartPage.continueButton')" @click="goToAftercare" />
        <q-btn flat class="checkout-btn" :label="$t('cartPage.checkoutButton')" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const cartItems = ref(
      JSON.parse(localStorage.getItem("cart"))?.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })) || []
    );

    const router = useRouter();

    const saveToLocalStorage = () => {
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const removeFromCart = (index) => {
      cartItems.value.splice(index, 1);
      saveToLocalStorage();
    };

    const increaseQuantity = (index) => {
      cartItems.value[index].quantity += 1;
      saveToLocalStorage();
    };

    const decreaseQuantity = (index) => {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity -= 1;
        saveToLocalStorage();
      }
    };

    const totalCost = computed(() =>
      cartItems.value.reduce(
        (sum, item) => sum + item.AftercareProductPrice * item.quantity,
        0
      )
    );

    const goToAftercare = () => {
      router.push("/aftercare");
    };

    return {
      cartItems,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      totalCost,
      goToAftercare,
    };
  },
};
</script>

<style scoped>
.q-page {
  padding-top: 25px;
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
  color: white;
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  color: black;
}

.cart-page {
  padding: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out;
}

.cart-item:hover {
  transform: scale(1.05);
}

.cart-item-light {
  background: white;
}

.cart-item-dark {
  background: rgb(24, 24, 24);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-info {
  flex: 1;
  padding-left: 10px;
}

.cart-item-info h3 {
  font-size: 16px;
  margin: 0;
}

.cart-item-info p {
  font-size: 14px;
  margin: 0;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-quantity p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.empty-cart {
  text-align: center;
  color: var(--q-text-secondary);
}

.cart-summary {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.cart-actions .q-btn {
  width: 45%;
}

.q-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 12px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.checkout-btn {
  background: rgb(34, 139, 34);
  background: linear-gradient(159deg, rgba(34, 139, 34, 1) 0%, rgba(50, 205, 50, 1) 100%);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 100%;
  }

  .cart-item-image {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }

  .cart-item-info {
    width: 100%;
    padding: 0;
    text-align: center;
  }

  .cart-item-info h3 {
    font-size: 14px;
  }

  .cart-item-info p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .cart-item-quantity {
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .cart-item .q-btn[icon="delete"] {
    margin-top: 10px;
    align-self: center;
    justify-content: center;
  }

  .cart-actions {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .cart-actions .q-btn {
    width: 100%;
  }

  .cart-summary {
    font-size: 16px;
    margin-bottom: 15px;
  }
}
</style>





