
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDB } from "../../../../lib/mongoose";
// import Payment from "../../../../lib/models/Payment";

// const getOrderDetails = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { orderId } = req.query;

//   if (!orderId) {
//     return res.status(400).json({ error: "Order ID is required" });
//   }

//   try {
//     await connectToDB();
//     const order = await Payment.findOne({ orderId }).exec();

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.status(200).json({
//       orderId: order.orderId,
//       totalAmount: order.totalAmount,
//       status: order.status,
//       customerName: order.customerName,
//       customerAddress: order.customerAddress,
//     });
//   } catch (error) {
//     console.error("Error fetching order details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export default getOrderDetails;

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongoose";
import Payment from "../../../../lib/models/Payment";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    await connectToDB();
    const order = await Payment.findOne({ orderId }).exec();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      orderId: order.orderId,
      totalAmount: order.totalAmount,
      status: order.status,
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      images: order.products.map((p: { image: any; })=> p.image),
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
