export function extractNumberFromAssetFileName(filePath: string) {
    const match = filePath.match(/\/P(\d+)\.txt$/);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}