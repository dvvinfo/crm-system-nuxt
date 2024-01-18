<script lang="ts" setup>
import dayjs from "dayjs";
import { useMutation } from "@tanstack/vue-query";
import type { ICard, IColumn } from "@/types/kanban";
import { useKanbanQuery } from "@/utils/useKanbanQuery";
import { convertCurrency } from "@/utils/convertCurrency";
import { DB_ID, COLLECTION_DEALS } from "@/utils/app.constants";
import type { EnumStatus } from "~/types/deals";
import { generateColumnStyle } from "@/utils/generate-gradient";

useHead({
  title: "Home|CRM System",
});

const dragCard = ref<ICard | null>(null)
const sourceColumn = ref<IColumn | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()
const store = useDealSlideStore()

type TypeMutationVariables = {
	docId: string
	status?: EnumStatus
}

const { mutate } = useMutation({
	mutationKey: ['move card'],
	mutationFn: ({ docId, status }: TypeMutationVariables) =>
		DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
			status,
		}),
	onSuccess: () => {
		refetch()
	},
})

function handleDragStart(card: ICard, column: IColumn) {
	dragCard.value = card
	sourceColumn.value = column
}

function handleDragOver(event: DragEvent) {
	event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
	if (dragCard.value && sourceColumn.value) {
		mutate({ docId: dragCard.value.id, status: targetColumn.id })
	}
}
</script>

<template>
	<div class="p-10">
		<h1 class="font-bold text-2xl mb-10">CRM System by RED Group</h1>
		<div v-if="isLoading">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-5 gap-16">
				<div
					v-for="(column, index) in data"
					:key="column.id"
					@dragover="handleDragOver"
					@drop="() => handleDrop(column)"
					class="min-h-screen"
				>
					<div
						class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
						:style="generateColumnStyle(index, data?.length)"
					>
						{{ column.name }}
					</div>
					<div>
						<KanbanCreateDeal :refetch="refetch" :status="column.id" />
						<UiCard
							v-for="card in column.items"
							:key="card.id"
							class="mb-5"
							draggable="true"
							@dragstart="() => handleDragStart(card, column)"
						>
							<UiCardHeader role="button" @click="store.set(card)">
								<UiCardTitle>{{ card.name }}</UiCardTitle>

								<UiCardDescription class="mt-2 block">{{
									convertCurrency(card.price)
								}}</UiCardDescription>
							</UiCardHeader>
							<UiCardContent class="text-xs">
								<div>Компания</div>
								{{ card.companyName }}</UiCardContent
							>
							<UiCardFooter>
								{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
							</UiCardFooter>
						</UiCard>
					</div>
				</div>
			</div>
			<Slideover />
		</div>
	</div>
</template>

<style></style>
