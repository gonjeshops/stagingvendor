import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RequestModal = () => {
  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button  className="p-3  bg-gonje-green capitalize">Request</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Request for Quote</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            className="bg-gonje h-12"
            placeholder="Quote Name"
          />
          <Input id="name" className="bg-gonje h-12" placeholder="Size" />
          <Input
            id="name"
            className="bg-gonje h-12"
            placeholder="Vendor Name"
          />
          {/* <Select>
            <SelectTrigger className="bg-gonje">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gonje">
              <SelectItem value="light">Food</SelectItem>
              <SelectItem value="dark">Cloth</SelectItem>
              <SelectItem value="system">Bags</SelectItem>
            </SelectContent>
          </Select> */}
          {/* <Input
            id="delivery_date"
            className="bg-gonje h-12"
            placeholder="Delivery Date"
          /> */}
          {/* <Input
            id="email"
            className="bg-gonje h-12"
            placeholder="Email Address"
          /> */}
          <Input id="Amount" className="bg-gonje h-12" placeholder="Amount" />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-gonje-green text-white w-full">
            Send Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const AcceptQuote = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-3 bg-gonje-green text-white capitalize">
          Accept
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">
            Are you absolutely sure?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
          <AlertDialogCancel className="bg-red-700 text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-gonje-green">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export const DeleteQuote = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="p-3 capitalize">
          delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">
            Are you absolutely sure?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
          <AlertDialogCancel className="bg-red-700 text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-gonje-green">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
