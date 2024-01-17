<script lang="ts" setup>
import type { ICard, IColumn } from '@/types/kanban';
useHead({
  title: "Home|CRM System",
})

const dragCard = ref<ICard | null>(null)
const sourceColumn = ref<IColumn | null>(null)
</script>

<template>
  <div class="p-10">
    <h1 class=" font-bold text-2xl mb-10">CRM System</h1>
    <UICard class="mb-3" draggable="true">
      <UICardHeader role="button"> Header</UICardHeader>
      <UICardContent>Content</UICardContent>
      <UICardFooter>Footer</UICardFooter>
    </UICard>
  </div>
</template>


<style>

</style>