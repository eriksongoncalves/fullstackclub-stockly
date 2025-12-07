"use client";

import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório"
  }),
  price: z.number().min(0.01, {
    message: "O preço do produto é obrigatório"
  }),
  stock: z.number().int().positive({
    message: "A quantidade do produto deve ser um valor positivo"
  })
});

type FormData = z.infer<typeof formSchema>;

export const AddProductButton = () => {
  const form = useForm<FormData>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0
    }
  });

  function onSubmit(formData: FormData) {
    // eslint-disable-next-line no-console
    console.log(formData);
  }

  return (
    <Dialog>
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
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
