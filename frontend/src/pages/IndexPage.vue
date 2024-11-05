<template>
  <q-page>
    <div class="flex flex-center">
      <img
        alt="Inkstitution Logo"
        src="~assets/logo1.png"
        style="width: 275px; height: 200px"
      >
      <h1>{{ $t("name") }}</h1>
    </div>
    <div class="flex flex-center">
        <div class="flex q-gutter-md">
          <q-card class="q-pa-md">
            <q-card-section>
              <q-icon name="home" size="50px" class="" />
            </q-card-section>
          </q-card>

          <div class="q-pa-md text-center">
            <h2>WHAT DO WE DO?</h2>
            <p>We connect clients with tattoo artists</p>
            <p>Book an appointment with one click</p>
            <q-btn>Book an appointment</q-btn>
          </div>
        </div>
    </div>

    <div class="flex flex-center">

      <div class="q-pa-md text-center">
          <h2>TRY IT OUT!
          </h2>
          <p>Sign Up Today
          </p>
          <p>Find the right artist</p>
          <q-btn>Sign Up</q-btn>
      </div>

        <div class="flex q-gutter-md">
          <q-card class="q-pa-md">
            <q-card-section>
              <q-icon name="home" size="50px" class="" />
            </q-card-section>
          </q-card>

        </div>
    </div>


    
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
});
</script>
