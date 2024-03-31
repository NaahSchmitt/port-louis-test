import { Request, Response } from 'express';
import { ProccessOrdersUseCase } from "../usecases/proccess-orders.usecase";
import { ProccessOrdersEnum } from '../enum/proccess-orders.enum';

export class OrdersController {
    proccessOrdersUseCase: ProccessOrdersUseCase = new ProccessOrdersUseCase();

    async proccessOrders(request: Request, response: Response) {
        try {
            const content = await this.proccessOrdersUseCase.handle();

            response.status(200).json({
                result: ProccessOrdersEnum.success,
                content
            })
        } catch (error) {
            response.status(500).send({
                result: ProccessOrdersEnum.failed,
                error
            });
        }
    }
}