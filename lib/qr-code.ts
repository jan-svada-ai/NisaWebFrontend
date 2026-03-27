import QRCode from "qrcode";

export async function generateQrSvg(content: string): Promise<string> {
  return QRCode.toString(content, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    width: 512,
    color: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  });
}
