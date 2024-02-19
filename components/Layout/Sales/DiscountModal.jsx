import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UpdateDiscountForm from "./UpdateDiscountForm";

export const AcceptDiscount = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="p-3 bg-gonje-green text-white capitalize">
            Accept
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-normal">Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
            <AlertDialogCancel className="bg-red-700 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-gonje-green">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  export const DeleteDiscount = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="p-3 capitalize">
            delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-normal">Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
            <AlertDialogCancel className="bg-red-700 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-gonje-green">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  export const UpdateDiscount = ({item}) => {
    console.log('item==', item)
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button  className="p-3 capitalize ">
            Update
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-normal">Set discount rate</AlertDialogTitle>
          </AlertDialogHeader>
          <UpdateDiscountForm item={item}/>
        </AlertDialogContent>
      </AlertDialog>
    );
  };