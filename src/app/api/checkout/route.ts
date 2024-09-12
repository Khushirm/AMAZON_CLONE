// import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../../types";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest, res: NextResponse) => {
  try{
  const { items, email,customerName , customerAddress } = await req.json();
  const lineItems = items?.map((item: StoreProduct) => ({
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
  const isNonINRTransaction = lineItems?.[0]?.price_data?.currency !== 'inr';
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    payment_method_types: ['card'],   
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items?.map((item: any) => item.image)),
    },
    billing_address_collection:  isNonINRTransaction ? 'required' : 'auto',
    shipping_address_collection:{
      allowed_countries: isNonINRTransaction?['*']:['IN'],
    },
    customer_email:email,
    customer_name:customerName,
    shipping_address:isNonINRTransaction?undefined:{
      line1:customerAddress,
    }
  });
  return NextResponse.json({ sessionId: session.id });
}catch(error){
  console.error("Stripe Error",error);
  return NextResponse.json(
    { error: "An error occurred. Please try again later." },
    { status: 500 }
  );
};
};

