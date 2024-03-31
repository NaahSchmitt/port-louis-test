import * as fs from 'fs';
import { join } from 'path';

export const FileSystemHelper = {
    async checkFolderExist(filePath: string): Promise<string> {
        const rootPath = process.cwd();

        const possiblePaths = [
            join(rootPath, filePath),
            join(rootPath, 'dist', filePath),
        ];

        for (const path of possiblePaths) {
            if (await fs.promises.stat(path)) {
                return path;
            }
        }

        throw new Error(`Folder not found: ${filePath}`);
    },
    async getFilesInFolder(folderPath: string): Promise<string[]> {
        try {
            const files: string[] = [];
            const folderContents = await fs.promises.readdir(folderPath);

            folderContents.forEach(item => {
                const fullPath = join(folderPath, item);
                const stats = fs.statSync(fullPath);

                if (stats.isFile()) {
                    files.push(fullPath);
                }
            });

            return files;
        } catch (error) {
            console.error('Error listing files:', error);
            return [];
        }
    },
    async readFile(filePath: string) {
        try {
            return await fs.promises.readFile(filePath, "utf8")
        } catch (error) {
            console.error(error)
        }
    }
};