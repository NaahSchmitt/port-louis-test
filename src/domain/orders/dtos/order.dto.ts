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