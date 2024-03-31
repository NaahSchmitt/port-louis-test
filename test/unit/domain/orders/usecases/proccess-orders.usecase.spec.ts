import { InvoiceDto } from "../../../../../src/domain/invoices/dtos/invoices.dto";
import { ItemBalanceSummaryDto, OrderCalculateItemsBalanceAndGenerateReportDto, OrderCalculateItemsBalanceDto, OrderDto, OrderFinalReportDto, OrderReportDto } from "../../../../../src/domain/orders/dtos/order.dto";
import { ProccessOrdersUseCase } from "../../../../../src/domain/orders/usecases/proccess-orders.usecase";
import { FileSystemHelper } from "../../../../../src/infrastructure/helpers/file-system.helper";
import { InvoicesMock } from "../../../../mocks/invoices.mock";
import { OrdersMock } from "../../../../mocks/orders.mock";
import { ResultSuccessMock } from "../../../../mocks/result.mock";

describe('ProccessOrdersUseCase', () => {
    describe('calculateOrderTotal', () => {
        test('calculates the total value of an order correctly', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const order: OrderDto = {
                id_pedido: 1,
                data: [
                    { número_item: 1, quantidade_produto: 5, valor_unitário_produto: "10,00", código_produto: "string" },
                    { número_item: 2, quantidade_produto: 3, valor_unitário_produto: "15,00", código_produto: "string" }
                ]
            };
            const expectedTotal = "95.00";

            const total = proccessOrdersUseCase.calculateOrderTotal(order);

            expect(total).toEqual(expectedTotal);
        });
    });

    describe('itemsBalanceReport', () => {
        test('calculates items balance report correctly', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const order: OrderDto = {
                id_pedido: 1,
                data: [
                    { 'número_item': 1, quantidade_produto: 5, valor_unitário_produto: "10,00", código_produto: "string" }
                ]
            };
            const itemsBalance: ItemBalanceSummaryDto = { 1: 3 };
            const expectedReport: OrderCalculateItemsBalanceDto = {
                missingInvoiceItems: true,
                tooManyItems: false,
                missingItemsList: [{ 'número_item': '1', saldo_quantidade: 3, }],
                orderTotalValue: "50,00",
                missingItemsTotalValue: "30,00"
            };

            const report = proccessOrdersUseCase.itemsBalanceReport(itemsBalance, order);

            expect(report).toEqual(expectedReport);
        });

        test('throws an error when too many items are invoiced', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const order: OrderDto = {
                id_pedido: 1,
                data: [
                    { número_item: 1, quantidade_produto: 5, valor_unitário_produto: "10,00", código_produto: "string" }
                ]
            };
            const itemsBalance: ItemBalanceSummaryDto = { 1: -3 };

            expect(() => {
                proccessOrdersUseCase.itemsBalanceReport(itemsBalance, order);
            }).toThrow();
        });
    });

    describe('calculateItemsBalanceAndGenerateReport', () => {
        test('generates items balance report with invoices', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const order: OrderDto = {
                id_pedido: 1,
                data: [
                    { número_item: 1, quantidade_produto: 5, valor_unitário_produto: "10,00", código_produto: "string" },
                    { número_item: 2, quantidade_produto: 3, valor_unitário_produto: "15,00", código_produto: "string" }
                ]
            };
            const invoicesList: InvoiceDto[] = [
                {
                    invoice: 1,
                    data: [
                        { id_pedido: 1, número_item: 1, quantidade_produto: 3 },
                        { id_pedido: 1, número_item: 2, quantidade_produto: 2 }
                    ]
                }
            ];
            const expectedReport: OrderCalculateItemsBalanceAndGenerateReportDto = {
                missingInvoiceItems: true,
                tooManyItems: false,
                missingItemsList: [
                    { saldo_quantidade: 2, número_item: "1" },
                    { saldo_quantidade: 1, número_item: "2" }
                ],
                orderTotalValue: "95,00",
                missingItemsTotalValue: "35,00",
                invoices: [1]
            };

            const report = proccessOrdersUseCase.calculateItemsBalanceAndGenerateReport(order, invoicesList);

            expect(report).toEqual(expectedReport);
        });
    });

    describe('extractFinalReportItem', () => {
        test('returns final report item when items are missing invoices', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const reportItem: OrderReportDto = {
                id_pedido: 1,
                invoices: [1],
                tooManyItems: true,
                missingInvoiceItems: true,
                orderTotalValue: "105,00",
                missingItemsTotalValue: "30,00",
                missingItemsList: [{ número_item: '2', saldo_quantidade: 3 }]
            };
            const expectedFinalReport: OrderFinalReportDto = {
                id_pedido: 1,
                valor_total_pedido: "105,00",
                saldo_pendente: "30,00",
                items_pendentes: [{ número_item: '2', saldo_quantidade: 3 }]
            };

            const finalReportItem = proccessOrdersUseCase.extractFinalReportItem(reportItem);

            expect(finalReportItem).toEqual(expectedFinalReport);
        });

        test('returns null when no items are missing invoices', () => {
            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            const reportItem: OrderReportDto = {
                id_pedido: 1,
                invoices: [1],
                tooManyItems: true,
                missingInvoiceItems: false,
                orderTotalValue: "105,00",
                missingItemsTotalValue: "0,00",
                missingItemsList: []
            };

            const finalReportItem = proccessOrdersUseCase.extractFinalReportItem(reportItem);

            expect(finalReportItem).toBeNull();
        });
    });

    describe('handle', () => {
        it('generates result file and returns file path and data', async () => {
            const ordersAdapterMock = { getOrders: jest.fn().mockResolvedValue(OrdersMock) };
            const invoicesAdapterMock = { getInvoices: jest.fn().mockResolvedValue(InvoicesMock) };

            const proccessOrdersUseCase = new ProccessOrdersUseCase();
            proccessOrdersUseCase.ordersAdapter = ordersAdapterMock as any;
            proccessOrdersUseCase.invoicesAdapter = invoicesAdapterMock as any;

            const result = await proccessOrdersUseCase.handle();

            expect(ordersAdapterMock.getOrders).toHaveBeenCalled();
            expect(invoicesAdapterMock.getInvoices).toHaveBeenCalled();

            expect(result).toHaveProperty('file_path', '/assets/result.txt');
            expect(result).toHaveProperty('data');
            expect(Array.isArray(result.data)).toBe(true);
        });
    });
});
