import Banner from "@/components/Banner";
import Products from "@/components/Products";


export default async function Home() {

  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await res.json();
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto bg-gray-200">
        <Banner />
        <div className="relative md:-mt-0">
          {productData && <Products productData={productData} image={""} />}
        </div>
      </div>
    </main>
  );
}
