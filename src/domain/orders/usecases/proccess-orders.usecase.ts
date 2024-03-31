import { InvoicesAdapter } from "../../invoices/adapter/invoices.adapter";
import { OrdersAdapter } from "../adapter/orders.adapter"

export class ProccessOrdersUseCase {
    ordersAdapter = new OrdersAdapter();
    invoicesAdapter = new InvoicesAdapter();

    async handle() {
        const getOrders = await this.ordersAdapter.getOrders();
        const getInvoices = await this.invoicesAdapter.getInvoices();
        console.log(getInvoices[0])
        // for (let index = 0; index < getOrders.length; index++) {
        //     const currentOrder = getOrders[index];
        // }

        // console.log({ getOrders, getInvoices })   

        console.log("ProccessOrdersUseCase")
    }
}