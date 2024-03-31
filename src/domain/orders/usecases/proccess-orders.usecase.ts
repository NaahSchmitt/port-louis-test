import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"

export class ProccessOrdersUseCase {
    async handle() {

        const getFolderOrdersAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Pedidos")
        const getFolderOrdersAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderOrdersAssetsPath)

        const getFolderInvoicesAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Notas")
        const getFolderInvoicesAssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderInvoicesAssetsPath)

        console.log({ getFolderOrdersAssetsPath, getFolderInvoicesAssetsPath, getFolderOrdersAssetsFiles, getFolderInvoicesAssetsFiles })
        console.log("ProccessOrdersUseCase")
    }
}