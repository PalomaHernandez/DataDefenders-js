<template>
	<Layout>
    <template #title>My account</template>
    <template #status></template>
    <template #tools>
      <RouterLink :to="{name: 'account.edit'}">
        <button class="btn btn-primary">
          Edit profile
        </button>
      </RouterLink>
    </template>
    <div class="bg-white shadow p-4 mt-24">
      <div class="grid">
        <div class="relative">
          <div class="flex items-center justify-center text-7xl">
            <i class="fa-solid fa-circle-user fa-2xl" style="color: #0369a1"></i> 
          </div>
          <div v-if="currentAccount" class="mt-24 text-center">
            <h1 class="text-4xl font-medium text-gray-700">{{ currentAccount?.last_name }}, {{ currentAccount?.first_name }} {{ currentAccount?.middle_name }}</h1>
            <p class="font-light text-gray-600 mt-3">{{ currentAccount?.city }}, {{ currentAccount?.region }}, {{ currentAccount?.country }}</p>

            <p class="mt-8 text-gray-500">
              <i class="fa-solid fa-envelope fa-lg" style="color: #0369a1;"></i>
              {{ currentAccount?.email }}
            </p>
            <p class="mt-2 text-gray-500">
              <i class="fa-solid fa-id-card" style="color: #0369a1;"></i>
              {{ currentAccount?.id_card }}
            </p>
            <p class="mt-2 text-gray-500">
              <i class="fa-solid fa-phone" style="color: #0369a1;"></i>
              {{ currentAccount?.phone }}
            </p>
            <p class="mt-2 text-gray-500">
              <i class="fa-solid fa-location-dot" style="color: #0369a1;"></i>
              {{ currentAccount?.address_line_1 }}
            </p>
            <p class="mt-2 text-gray-500" v-if="currentAccount.address_line_2">
              <i class="fa-solid fa-location-dot" style="color: #0369a1;"></i>
              {{ currentAccount?.address_line_2 }}
            </p>
            <p class="mt-2 text-gray-500">
              <i class="fa-solid fa-house-flag" style="color: #0369a1;"></i>
              {{ currentAccount?.postal_code }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {useAuthStore} from '@/stores/auth'
import type Account from '@/types/Account'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
  name: "EditAccount",
  components: {
    Layout,
    LabeledObject
  },
  computed: {
    isAuthenticated(): boolean {
      return this.authStore.authenticated
    },
    currentAccount(): Account | null{
      return this.authStore.currentAccount
    }
  },
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
    }
  },
}
</script>