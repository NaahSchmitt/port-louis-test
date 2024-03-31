import * as fs from 'fs';
import { join } from 'path';

export const FileSystemHelper = {
    checkFolderExist(filePath: string) {
        const rootPath = process.cwd();

        const possiblePaths = [
            join(rootPath, filePath),
            join(rootPath, 'dist', filePath),
        ];

        for (const path of possiblePaths) {
            if (fs.existsSync(path)) {
                return path;
            }
        }

        throw new Error(`Folder not found: ${filePath}`);
    },
};