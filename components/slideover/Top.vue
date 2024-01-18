<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSlideStore } from "@/stores/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">О сделке</div>
    <SlideoverLabel label-text="Наименование">
      <h2>
        {{ store.card?.name }}
      </h2>
    </SlideoverLabel>
    <SlideoverLabel label-text="Сумма">
      {{ convertCurrency(store.card?.price || 0) }}
    </SlideoverLabel>
    <SlideoverLabel label-text="Статус">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </SlideoverLabel>
    <SlideoverLabel label-text="Клиент">
      {{ store.card?.companyName }}
    </SlideoverLabel>
    <SlideoverLabel label-text="Дата создания">
      {{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}
    </SlideoverLabel>
  </div>
</template>
