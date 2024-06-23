import { Buffer } from "buffer";

export function feltToString(felt: string) {
  const newStrB = Buffer.from(felt.toString(), "hex");
  return newStrB.toString();
}
export function stringToFelt(str: string) {
    console.log( "0x" + Buffer.from(str).toString("hex"))
  return "0x" + Buffer.from(str).toString("hex");
}
