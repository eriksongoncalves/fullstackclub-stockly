"use client";

import { CircleIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/app/_components/badge";
import { ProductDto } from "@/app/_data-access/product/get-products";

const getStatusLabel = (status: string) => {
  return status === "IN_STOCK" ? "Em estoque" : "Fora de estoque";
};

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto"
  },
  {
    accessorKey: "price",
    header: "Valor unitário"
  },
  {
    accessorKey: "stock",
    header: "Estoque"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: row => {
      const product = row.row.original;

      const label = getStatusLabel(product.status);
      return (
        <Badge variant={label === "Em estoque" ? "default" : "outline"} className="gap-1.5">
          <CircleIcon
            size={14}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    }
  }
];
