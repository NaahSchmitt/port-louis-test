export function extractNumberFromAssetFileName(filePath: string): string | null {
    const match = filePath.match(/\/(?:N|P)(\d+)\.txt$/);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}