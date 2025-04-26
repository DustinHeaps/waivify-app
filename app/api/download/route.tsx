import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/prisma";

import WaiverPDF from "@/components/WaiverPDF";
import { format } from "date-fns";
import { getUserById } from "@/app/actions/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const waiverId = searchParams.get("waiverId");

  const user = await getUserById();
  let logoUrl: string = "";
  let companyName: string = "";

  logoUrl = user?.logoUrl as string;
  companyName = user?.companyName as string;

  if (!waiverId) return new NextResponse("Missing waiverId", { status: 400 });

  const waiver = await db.waiver.findUnique({
    where: { id: waiverId },
    include: { signature: true },
  });

  if (!waiver || !waiver.signature)
    return new NextResponse("Waiver or signature not found", { status: 404 });

  const formattedDate = format(waiver.signature.date, "MMMM d, yyyy");

  const pdfBuffer = await renderToBuffer(
    <WaiverPDF
      plan={user?.plan as string}
      name={waiver.signature.name}
      date={formattedDate}
      waiverId={waiver.signature.id}
      signatureUrl={`https://uploadthing.com/f/${waiver.signature.fileKey}`}
      ipAddress={waiver.ipAddress}
      terms={waiver.terms ?? false}
      liability={waiver.liability ?? false}
      logoUrl={logoUrl}
      companyName={companyName}
      fields={(waiver.fields ?? {}) as Record<string, string | boolean>}
    />
  );

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=waiver-${waiver.signature.id}.pdf`,
    },
  });
}
