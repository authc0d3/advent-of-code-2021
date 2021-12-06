import * as fs from "fs";

export function readFile(
  filePath: string,
  encoding: BufferEncoding = "utf8",
  splitLines: boolean = true
): string | string[] {
  try {
    const data = fs.readFileSync(filePath, encoding);
    return splitLines ? data.replace(/\r/gi, "").split("\n") : data;
  } catch (err) {
    console.error(err);
    return splitLines ? [] : "";
  }
}
