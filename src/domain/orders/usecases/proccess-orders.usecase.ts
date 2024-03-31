import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"

export class ProccessOrdersUseCase {
    handle() {

        const checkFolderOrdersExist = FileSystemHelper.checkFolderExist("/assets/Pedidos")
        const checkFolderInvoicesExist = FileSystemHelper.checkFolderExist("/assets/Notas")

        console.log({ checkFolderOrdersExist, checkFolderInvoicesExist })
        console.log("ProccessOrdersUseCase")
    }
}