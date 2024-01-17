<script lang="ts" setup>
import dayjs from "dayjs";
import type { ICard, IColumn } from "@/types/kanban";
import { useKanbanQuery } from "@/utils/useKanbanQuery";
import { convertCurrency } from "@/utils/convertCurrency";
useHead({
  title: "Home|CRM System",
});

const dragCard = ref<ICard | null>(null);
const sourceColumn = ref<IColumn | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading" class="">loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-8 text-sm">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <UICard
              v-for="card in column.items"
              :key="card.id"
              class="mt-3 flex flex-col"
              draggable="true"
            >
              <UICardHeader role="button"
                ><UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2 block">{{
                  convertCurrency(card.price)
                }}</UiCardDescription>
              </UICardHeader>

              <UICardContent class=" text-xs">Компания {{ card.companyName }}</UICardContent>
              <UICardFooter>{{
                dayjs(card.$createdAt).format("DD.MM.YYYY")
              }}</UICardFooter>
            </UICard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
