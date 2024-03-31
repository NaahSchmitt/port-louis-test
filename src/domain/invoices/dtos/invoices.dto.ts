export interface InvoiceDataItemDto {
    id_pedido: number;
    'número_item': number;
    quantidade_produto: number;
}

export interface InvoiceDto {
    invoice: number;
    data: InvoiceDataItemDto[];
}