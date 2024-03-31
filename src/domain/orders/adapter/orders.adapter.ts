import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"

export class OrdersAdapter {
    async getOrders() {
        const orders = []

        const getFolderOrdersAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Pedidos")
        
        const getFolderOrdersAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderOrdersAssetsPath)

        for (const filePath of getFolderOrdersAssetsFiles) {
            try {
                const currentFile = await FileSystemHelper.readFile(filePath);
                if (currentFile) {
                    orders.push(currentFile.split("\n").map(item => item && JSON.parse(item.trim())).filter(item => !!item))
                }
            } catch (error) {
                console.error(`${filePath}:`, error);
            }
        }

        return orders;
    }
}