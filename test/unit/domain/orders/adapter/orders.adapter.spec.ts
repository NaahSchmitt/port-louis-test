import { OrdersAdapter } from "../../../../../src/domain/orders/adapter/orders.adapter";
import { OrdersMock } from "../../../../mocks/orders.mock";

describe('OrdersAdapter', () => {
    test('returns an array when order files are available', async () => {
        const ordersAdapter = new OrdersAdapter();
        const orders = await ordersAdapter.getOrders();
        expect(orders).toEqual(OrdersMock);
    });
});
