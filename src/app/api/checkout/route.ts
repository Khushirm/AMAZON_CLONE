// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { StoreProduct } from "../../../../types";
import { connectToDB } from "../../../../lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Payment from "../../../../lib/models/Payment";
import mongoose from "mongoose";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
  try{
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error("No session found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
  const { items, email, customerAddress } = await req.json();
  if(!items || !email || !customerAddress){
    return NextResponse.json({error:"Missing required fields"},{status:400});
  }
  const lineItems = items.map((item: StoreProduct) => ({
    quantity: item.quantity,
    price_data: {
      currency: "inr",
      unit_amount: Math.round(item.price * 100),
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));
  const totalAmount= items.reduce(
    (total: number, item: { price: number; quantity: number; }) => total+ item.price*item.quantity,
    0
  );
  // const isNonINRTransaction = lineItems?.[0]?.price_data?.currency !== 'inr';
  const sessionStripe = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    payment_method_types: ['card'],   
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
    customer_email: email,
  });
  const paymentData = new Payment({
    userId: new mongoose.Types.ObjectId(userId),
    email,
    products:items.map((item: any)=>({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    totalAmount,
    address: customerAddress,
    status: "pending",
  });
  await paymentData.save();
  return NextResponse.json({ sessionId: sessionStripe.id });
}catch(error){
  console.error("Stripe Error",error);
  return NextResponse.json(
    { error: "An error occurred. Please try again later." },
    { status: 500 }
  );
};
};

