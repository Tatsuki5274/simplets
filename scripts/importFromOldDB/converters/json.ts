import { listFilesInDir, readFile } from "../files";

/**
 * @description 指定したディレクトリに格納されている全てのファイルを一つの配列オブジェクトに変換する
 * @param typeDirPath テーブルデータのディレクトリ
 * @returns 解析したオブジェクトの配列
 */
 export async function convertJson(typeDirPath: string) {
    // ファイル名を取得
    const files = await listFilesInDir(typeDirPath);
    console.log("files", files);
    const result = await Promise.all(files.map(async (fileName) => {
        // 生のファイルテキストを取得
        const rawFile = await readFile([typeDirPath, fileName].join("/"));
        // 一行ずつのデータに分割(JSON文字列)
        const rows = rawFile.split("\n");
        const jsons = rows.map((row) => {
            let result = null;
            try {
                result = JSON.parse(row);
            } catch (e) {
                // JSONに変換できないデータは無視する
                console.error("error", e.message);
            }
            return result;
        })
        const result: any[] = [];
        jsons.forEach((json) => {
            // nullデータを除外する
            if(json){
                result.push(json);
            }
        })
        return result;
    }));
    const flat = result.flat();
    const list = flat.map(d => d.Item);
    return list;
}