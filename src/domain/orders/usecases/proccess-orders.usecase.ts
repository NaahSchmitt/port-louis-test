import { OrdersAdapter } from "../adapter/orders.adapter"

export class ProccessOrdersUseCase {
    ordersAdapter = new OrdersAdapter();

    async handle() {
        const getOrders = await this.ordersAdapter.getOrders();

        for (let index = 0; index < getOrders.length; index++) {
            const currentOrder = getOrders[index];
            console.log({ currentOrder })   
        }
        console.log("ProccessOrdersUseCase")
    }
}