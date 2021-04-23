import { promises as fs } from 'fs'

/**
 * @description 指定のディレクトリに含まれるファイル名を一覧で取得する
 * @param dir ディレクトリパス
 * @returns ファイル名のリスト
 */
export async function listFilesInDir(dir: string): Promise<string[]> {
    const result = await fs.readdir(dir, {encoding: "utf-8"});
    return result;
}

export async function readFile(fileName: string): Promise<string> {
    const buff = await fs.readFile(fileName, "utf-8");
    return buff;
}