import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"
import { OrdersAdapter } from "../adapter/orders.adapter"

export class ProccessOrdersUseCase {
    ordersAdapter = new OrdersAdapter();

    async handle() {

        const getOrders = await this.ordersAdapter.getOrders();

        // const getFolderInvoicesAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Notas")
        // const getFolderInvoicesAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderInvoicesAssetsPath)

        console.log({ getOrders })
        console.log("ProccessOrdersUseCase")
    }
}