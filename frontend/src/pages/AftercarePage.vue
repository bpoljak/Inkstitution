<template>
  <q-page
    class="aftercare-page"
    :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }"
  >
    <div class="search-bar">
      <q-input
        placeholder="Search for a product..."
        v-model="searchQuery"
        outlined
        dense
        clearable
        debounce="300"
        @input="filterProducts"
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="cart-button">
        <q-btn
          round
          flat
          icon="shopping_cart"
          color="primary"
          @click="goToCart"
          aria-label="Cart"
        />
      </div>
    </div>

    <div class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.aftercareProductId"
        class="product-card"
        @click="expandImage(product)"
      >
        <q-card class="q-pa-md">
          <q-img
            :src="product.AftercareProductImage"
            :alt="product.AftercareProductName"
            class="product-image"
          />
          <q-card-section>
            <div class="text-center">
              <h3 class="product-name">{{ product.AftercareProductName }}</h3>
              <p class="product-price">{{ product.AftercareProductPrice }} €</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="expandedImage" class="image-modal" @click.self="closeModal">
      <div
        class="image-modal-card"
        :class="{
          'content-card-dark': $q.dark.isActive,
          'content-card-light': !$q.dark.isActive,
        }"
      >
        <img
          :src="expandedImage.AftercareProductImage"
          alt="Expanded Image"
          class="expanded-image"
        />
        <div class="image-modal-footer">
          <p>{{ expandedImage.AftercareProductName }}</p>
          <p>{{ expandedImage.AftercareProductPrice }} €</p>
          <q-btn
            class="q-my-md orange-gradient-btn"
            :label="$t('aftercareProductsPage.cartButton')"
            @click="goToStudioRegister"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const products = ref([]);
    const filteredProducts = ref([]);
    const searchQuery = ref("");
    const expandedImage = ref(null);
    const router = useRouter();

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/aftercareProducts`
        );
        console.log(response);
        products.value = response.data;
        filteredProducts.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const filterProducts = () => {
      if (searchQuery.value) {
        filteredProducts.value = products.value.filter((product) =>
          product.AftercareProductName.toLowerCase().includes(
            searchQuery.value.toLowerCase()
          )
        );
      } else {
        filteredProducts.value = products.value;
      }
    };

    const goToCart = () => {
      router.push("/cart");
    };

    const expandImage = (image) => {
      expandedImage.value = image;
    };

    const closeModal = () => {
      expandedImage.value = null;
    };

    onMounted(fetchProducts);

    return {
      products,
      filteredProducts,
      searchQuery,
      expandedImage,
      filterProducts,
      goToCart,
      expandImage,
      closeModal,
    };
  },
};
</script>

<style scoped>
.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.card-dark {
  background: rgb(24, 24, 24);
}

.card-light {
  background: white;
}

.aftercare-page {
  padding: 20px;
}

.search-bar {
  max-width: 500px;
  margin: 0 auto 20px auto;
  padding-top: 30px;
  position: relative;
}

.cart-button {
  position: absolute;
  top: 25px;
  right: -50px;
}

.cart-button .q-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: bold;
}

.cart-button .q-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kartice po redu */
  gap: 20px;
  justify-items: center;
  margin: 50px 150px 100px 150px;
}

.product-card {
  width: 220px; /* Fiksna širina */
  height: 350px; /* Fiksna visina */
  background-color: rgb(24, 24, 24);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer; /* Dodan pointer na hover */
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.q-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  width: 100%;
  height: 150px; /* Fiksna visina za slike */
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 10px 0 5px 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1rem;
  color: var(--q-text-secondary);
  text-align: center;
}

.q-card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.image-modal-card {
  width: 90vw;
  max-width: 500px;
  background: var(--card-background-color-light);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.expanded-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.image-modal-footer {
  margin-top: 15px;
  padding: 10px;
  background-color: var(--q-surface);
  width: 100%;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: var(--q-text-primary);
  border-top: 1px solid var(--q-text-secondary);
}

.orange-gradient-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.orange-gradient-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}
</style>
