import { OrdersAdapter } from "../../../../../src/domain/orders/adapter/orders.adapter";
import { FileSystemHelper } from "../../../../../src/infrastructure/helpers/file-system.helper";
import { OrdersMock } from "../../../../mocks/orders.mock";

describe('OrdersAdapter', () => {
    test('returns an array when order files are available', async () => {
        const ordersAdapter = new OrdersAdapter();
        const orders = await ordersAdapter.getOrders();
        expect(orders).toEqual(OrdersMock);
    });

    test('returns an empty array when no order files are available', async () => {
        FileSystemHelper.getFilesInFolder = jest.fn().mockResolvedValue([]);

        const ordersAdapter = new OrdersAdapter();
        const orders = await ordersAdapter.getOrders();

        expect(orders).toEqual([]);
    });
});
