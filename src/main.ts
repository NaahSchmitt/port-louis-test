import { OrdersController } from "./domain/orders/presentation/orders.controller";

function bootstrap() {
    new OrdersController().proccessOrders()
}

bootstrap();