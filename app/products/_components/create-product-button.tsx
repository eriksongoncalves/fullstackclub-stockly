"use client";

import { useState } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/app/_components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/app/_components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/form";
import { Input } from "@/app/_components/input";
import { createProduct } from "@/app/_actions/product/create-product";
import {
  createProductSchema,
  CreateProductSchema
} from "@/app/_actions/product/create-product/schema";

export const CreateProductButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0
    }
  });

  async function onSubmit(formData: CreateProductSchema) {
    try {
      await createProduct(formData);
      form.reset();
      setDialogOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Erro ao criar produto:", error);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Criar Produto</DialogTitle>
              <DialogDescription>Insira as informações abaixo</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço do produto</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Digite o preço do produto"
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={values => field.onChange(values.floatValue || 0)}
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade do produto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite o estoque do produto"
                      {...field}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="reset">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="gap-1.5" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2Icon className="animate-spin" size={16} />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};