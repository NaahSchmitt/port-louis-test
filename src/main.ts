import express from 'express';
import { config } from 'dotenv';
import { OrdersController } from "./domain/orders/presentation/orders.controller";

config();

function bootstrap() {
    const app = express();
    const port = process.env.PORT || 7777;

    const ordersController = new OrdersController();

    app.get('/process-orders', ordersController.proccessOrders.bind(ordersController));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

bootstrap();
