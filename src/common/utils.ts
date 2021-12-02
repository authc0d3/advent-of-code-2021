import * as fs from "fs";

export async function readFile(
  filePath: string,
  encoding: BufferEncoding = "utf8",
  splitLines: boolean = true
): Promise<string | string[]> {
  try {
    const data = await fs.readFileSync(filePath, encoding);
    return splitLines ? data.split("\n") : data;
  } catch (err) {
    console.error(err);
    return splitLines ? [] : "";
  }
}
