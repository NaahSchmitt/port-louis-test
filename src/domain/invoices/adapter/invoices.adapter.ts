import { extractNumberFromAssetFileName } from "../../../infrastructure/helpers/extract-number";
import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"

export class InvoicesAdapter {
    async getInvoices() {
        const invoices = []

        const getFolderInvoicesAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Notas")

        const getFolderInvoicesssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderInvoicesAssetsPath)

        for (const filePath of getFolderInvoicesssetsFiles) {
            try {
                const currentFile = await FileSystemHelper.readFile(filePath);
                const currentFileName = extractNumberFromAssetFileName(filePath);
                console.log({ currentFileName, filePath })
                if (currentFile) {
                    const data = currentFile.split('\n').map(item => item && JSON.parse(item.trim())).filter(item => !!item);
                    invoices.push({ invoice: Number(currentFileName), data })
                }
            } catch (error) {
                console.error(`${filePath}:`, error);
            }
        }

        return invoices;
    }
}