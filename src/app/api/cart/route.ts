// import { connectToDB } from "../../../../lib/mongoose";
// import Cart from "../../../../lib/models/cart.model";

// export default async function handler(req: { method: string; body: { userId: any; product: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; cart?: any; error?: any; }): void; new(): any; }; }; }) {
//   if (req.method === 'POST') {
//     await connectToDB();
//     const { userId, product } = req.body;

//     try {
//       let cart = await Cart.findOne({ userId });
//       if (!cart) {
//         cart = await Cart.create({ userId, products: [product] });
//       } else {
//         cart.products.push(product);
//         await cart.save();
//       }
//       res.status(200).json({ success: true, cart });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   }
// }
