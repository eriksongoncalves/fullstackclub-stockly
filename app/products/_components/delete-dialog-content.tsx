import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/app/_components/alert-dialog";
import { deleteProduct } from "@/app/_actions/product/delete-product";
import { toast } from "sonner";

type DeleteDialogContentProps = {
  productId: string;
};

export const DeleteDialogContent = ({ productId }: DeleteDialogContentProps) => {
  const handleContinueClick = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso.");
    } catch {
      toast.error("Ocorreu um erro ao excluir o produto.");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes excluir este produto. Esta ação não pode ser desfeita. Deseja continuar
          ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
