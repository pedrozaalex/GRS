export function rgba(rgb: string, a: number): string {
    return `rgba(${parseInt(rgb.slice(1, 3), 16)}, ${parseInt(rgb.slice(3, 5), 16)}, ${parseInt(rgb.slice(5, 7), 16)}, ${a})`;
}