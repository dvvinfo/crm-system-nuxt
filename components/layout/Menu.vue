<script lang="ts" setup>
import { MENU_DATA } from "@/types/menu.data";
</script>

<template>
  <div>
    <NuxtLink
      class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5 cursor-pointer"
      v-for="item in MENU_DATA"
      :key="item.name"
      :to="item.url"
    >
      <Icon :name="item.icon" size="22" class="mr-3" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style></style>
