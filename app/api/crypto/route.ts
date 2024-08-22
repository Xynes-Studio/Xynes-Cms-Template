import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { encryptData, decryptData } from "../../../utils/crypto";

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    if (!data || !action) {
      return NextResponse.json(
        { error: "Action and data are required" },
        { status: 400 }
      );
    }

    let result;

    if (action === "encrypt") {
      result = encryptData(data);
    } else if (action === "decrypt") {
      result = decryptData(data);
    } else {
      return NextResponse.json(
        { error: "Invalid action specified" },
        { status: 400 }
      );
    }

    return NextResponse.json({ result });
  } catch (error:any) {
    return NextResponse.json(
      { error: "An error occurred during processing "+error.message },
      { status: 500 }
    );
  }
}
