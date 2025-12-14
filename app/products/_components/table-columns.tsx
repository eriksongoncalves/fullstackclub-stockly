"use client";

import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/app/_components/dropdown-menu";

import { Badge } from "@/app/_components/badge";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { Button } from "@/app/_components/button";

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
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: row => {
      const product = row.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-1.5"
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                <ClipboardCopyIcon size={16} /> Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5" onClick={() => {}}>
                <EditIcon size={16} /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5" onClick={() => {}}>
                <TrashIcon size={16} /> Deletar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
