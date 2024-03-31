export interface OrderDataItemDto {
    número_item: number;
    código_produto: string;
    quantidade_produto: number;
    valor_unitário_produto: string;
}

export interface OrderDto {
    id_pedido: number;
    data: OrderDataItemDto[];
}

export type ItemBalanceSummaryDto = {
    [itemId: string]: number;
};

export interface OrderCalculateItemsBalanceItemDto {
    número_item: string;
    saldo_quantidade: number;
}

export interface OrderCalculateItemsBalanceDto {
    missingInvoiceItems: boolean;
    tooManyItems: boolean;
    missingItemsList: OrderCalculateItemsBalanceItemDto[];
    orderTotalValue: string;
    missingItemsTotalValue: string;
}

export interface OrderCalculateItemsBalanceAndGenerateReportDto extends OrderCalculateItemsBalanceDto {
    invoices: number[];
}

export interface OrderReportDto extends OrderCalculateItemsBalanceAndGenerateReportDto {
    id_pedido: number;
}

export interface OrderFinalReportPendingItemDto {
    número_item: string;
    saldo_quantidade: number;
};

export interface OrderFinalReportDto {
    id_pedido: number;
    valor_total_pedido: string;
    saldo_pendente: string;
    items_pendentes: OrderFinalReportPendingItemDto[];
};