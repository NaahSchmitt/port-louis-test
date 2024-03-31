import { extractNumberFromAssetFileName } from "../../../infrastructure/helpers/extract-number";
import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"
import { OrderDto, OrderDataItemDto } from "../dtos/order.dto";

export class OrdersAdapter {
    async getOrders(): Promise<OrderDto[]> {
        const orders: OrderDto[] = []

        const getFolderOrdersAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Pedidos")

        const getFolderOrdersAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderOrdersAssetsPath)

        for (const filePath of getFolderOrdersAssetsFiles) {
            try {
                const currentFile = await FileSystemHelper.readFile(filePath);
                const currentOrderFileName = extractNumberFromAssetFileName(filePath);

                if (currentFile) {
                    const data: OrderDataItemDto[] = currentFile.split('\n').map(item => item && JSON.parse(item.trim())).filter(item => !!item);
                    orders.push({ id_pedido: Number(currentOrderFileName), data })
                }
            } catch (error) {
                console.error(`${filePath}:`, error);
            }
        }

        return orders;
    }
}