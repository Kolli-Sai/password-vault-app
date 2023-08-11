/* eslint-disable react/prop-types */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../../../components/ui/sheet.jsx";

export default function AddNewPasswordSheet({
  trigger,
  title,
  description,
  content,
  actions,
}) {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter>
          <SheetClose>{actions}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
