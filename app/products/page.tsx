import { DataTable } from "@/app/_components/data-table";
import { getProducts } from "@/app/_data-access/product/get-products";

import { productTableColumns } from "./_components/table-columns";
import { CreateProductButton } from "./_components/create-product-button";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Gestão de Produtos</span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <CreateProductButton />
      </div>

      <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}