import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"
import { OrdersAdapter } from "../adapter/orders.adapter"

export class ProccessOrdersUseCase {
    ordersAdapter = new OrdersAdapter();

    async handle() {

        const allOrders = await this.ordersAdapter.getAllOrders();

        // const getFolderInvoicesAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Notas")
        // const getFolderInvoicesAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderInvoicesAssetsPath)

        console.log({ allOrders })
        console.log("ProccessOrdersUseCase")
    }
}