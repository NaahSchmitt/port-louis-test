import { InvoicesAdapter } from "../../invoices/adapter/invoices.adapter";
import { InvoiceDto } from "../../invoices/dtos/invoices.dto";
import { OrdersAdapter } from "../adapter/orders.adapter"
import { ItemBalanceSummaryDto, OrderCalculateItemsBalanceAndGenerateReportDto, OrderCalculateItemsBalanceDto, OrderDataItemDto, OrderDto, OrderFinalReportDto, OrderReportDto } from "../dtos/order.dto";

export class ProccessOrdersUseCase {
    ordersAdapter = new OrdersAdapter();
    invoicesAdapter = new InvoicesAdapter();

    calculateOrderTotal(order: OrderDto): string {
        return order.data.reduce((acc: number, item: OrderDataItemDto) => {
            const currentItemValue = Number(item["quantidade_produto"]) * Number(item["valor_unitário_produto"].replace(",", "."))
            return acc + currentItemValue
        }, 0).toFixed(2)
    }

    itemsBalanceReport(itemsBalance: ItemBalanceSummaryDto, order: OrderDto): OrderCalculateItemsBalanceDto {
        let missingInvoiceItems = false
        let tooManyItems = false
        let missingItemsList = []
        let missingItemsTotalValue: any = 0
        const totalValue = String(this.calculateOrderTotal(order)).replace(".", ",")

        for (let key in itemsBalance) {
            if (itemsBalance[key] > 0) {
                missingInvoiceItems = true
                missingItemsList.push({ "número_item": key, "saldo_quantidade": itemsBalance[key] })
                const item = order.data.find(item => item["número_item"] === Number(key));

                if (item) {
                    const unitaryValue = Number(item["valor_unitário_produto"].replace(",", "."));
                    missingItemsTotalValue += itemsBalance[key] * unitaryValue
                }
            }

            if (itemsBalance[key] < 0) {
                throw `Too many invoices for item number ${key} in order ${order["id_pedido"]}`
            }
        }

        missingItemsTotalValue = String(missingItemsTotalValue.toFixed(2)).replace(".", ",")

        return { missingInvoiceItems, tooManyItems, missingItemsList, orderTotalValue: totalValue, missingItemsTotalValue }
    }

    calculateItemsBalanceAndGenerateReport(order: OrderDto, invoicesList: InvoiceDto[]): OrderCalculateItemsBalanceAndGenerateReportDto {
        const orderId = Number(order["id_pedido"])

        const invoicesFilteredByOrderId = invoicesList.filter(invoice =>
            invoice.data.some(data => data["id_pedido"] === orderId)
        );

        const invoicesId = invoicesFilteredByOrderId.map(item => item.invoice);
        const invoicesDatas = invoicesFilteredByOrderId
            .flatMap(item => item.data)
            .filter(item => item["id_pedido"] === orderId);

        const itemNumbers = order.data.map(item => item["número_item"]);
        const itemsBalanceSummary: ItemBalanceSummaryDto = {};

        for (const itemNumber of itemNumbers) {
            const itemQuantity = Number(order.data.find(item => item["número_item"] === Number(itemNumber))?.quantidade_produto || 0);

            const invoicesQuantities = invoicesDatas
                .filter(item => item["número_item"] === Number(itemNumber))
                .map(item => Number(item["quantidade_produto"]))
                .reduce((acc, val) => acc + val, 0);

            itemsBalanceSummary[itemNumber] = (itemsBalanceSummary[itemNumber] || 0) + itemQuantity - invoicesQuantities;
        }

        const itemsBalanceReport: OrderCalculateItemsBalanceDto = this.itemsBalanceReport(itemsBalanceSummary, order)

        return {
            ...itemsBalanceReport,
            invoices: invoicesId
        }
    }

    extractFinalReportItem(item: OrderReportDto): OrderFinalReportDto | null {
        return item.missingInvoiceItems ? {
            id_pedido: item.id_pedido,
            valor_total_pedido: item.orderTotalValue,
            saldo_pendente: item.missingItemsTotalValue,
            items_pendentes: item.missingItemsList
        } : null;
    }

    extractAndFilterFinalReportItems(report: OrderReportDto[]): (OrderFinalReportDto | null)[] {
        return report.map(this.extractFinalReportItem).filter(item => !!item);
    }

    async handle() {
        const orders = await this.ordersAdapter.getOrders();
        const invoices = await this.invoicesAdapter.getInvoices();

        const ordersReport: OrderReportDto[] = orders.map(order => ({
            ...this.calculateItemsBalanceAndGenerateReport(order, invoices),
            id_pedido: order.id_pedido
        }));

        const finalReport = this.extractAndFilterFinalReportItems(ordersReport)

        console.clear()
        console.log(JSON.stringify(finalReport))

        console.log("ProccessOrdersUseCase")
    }
}