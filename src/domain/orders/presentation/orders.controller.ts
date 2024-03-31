import { ProccessOrdersUseCase } from "../usecases/proccess-orders.usecase";

export class OrdersController {
    proccessOrdersUseCase: ProccessOrdersUseCase = new ProccessOrdersUseCase();

    proccessOrders() {
        return this.proccessOrdersUseCase.handle()
    }
}