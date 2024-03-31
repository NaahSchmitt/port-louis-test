import { extractNumberFromAssetFileName } from "../../../infrastructure/helpers/extract-number";
import { FileSystemHelper } from "../../../infrastructure/helpers/file-system.helper"
import { InvoiceDataItemDto, InvoiceDto } from "../dtos/invoices.dto";

export class InvoicesAdapter {
    async getInvoices(): Promise<InvoiceDto[]> {
        const invoices: InvoiceDto[] = []

        const getFolderInvoicesAssetsPath = await FileSystemHelper.checkFolderExist("/assets/Notas")

        const getFolderInvoicesssetsFiles = await FileSystemHelper.getFilesInFolder(getFolderInvoicesAssetsPath)

        for (const filePath of getFolderInvoicesssetsFiles) {
            try {
                const currentFile = await FileSystemHelper.readFile(filePath);
                const currentFileName = extractNumberFromAssetFileName(filePath);

                if (currentFile) {
                    const data: InvoiceDataItemDto[] = currentFile.split('\n').map(item => item && JSON.parse(item.trim())).filter(item => !!item);
                    invoices.push({ invoice: Number(currentFileName), data })
                }
            } catch (error) {
                console.error(`${filePath}:`, error);
            }
        }

        return invoices;
    }
}