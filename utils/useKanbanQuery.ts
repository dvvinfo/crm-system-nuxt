import { useQuery } from "@tanstack/vue-query";
import type { IDeal } from "~/types/deals";
import type { IColumn } from "~/types/kanban";
import { KANBAN_DATA } from "~/types/kanban.data";
import { DB_ID, COLLECTION_DEALS } from "~/utils/app.constants";

export function useKanbanQuery() {
	return useQuery({
		queryKey: ['deals'],
		queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
		select(data) {
			const newBoard: IColumn[] = KANBAN_DATA.map(column => ({
				...column,
				items: [],
			}))

			const deals = data.documents as unknown as IDeal[]

			for (const deal of deals) {
				const column = newBoard.find(col => col.id === deal.status)
				if (column) {
					column.items.push({
						$createdAt: deal.$createdAt,
						id: deal.$id,
						name: deal.name,
						price: deal.price,
						companyName: deal.customer.name,
						status: column.name,
					})
				}
			}

			return newBoard
		},
	})
}
