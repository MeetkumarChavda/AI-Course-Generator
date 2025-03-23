import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <AlertDialogTitle className="sr-only">
            Generating Course Content
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/loader.gif"
                alt="Loading..."
                width={200}
                height={200}
                className="rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">Please wait...</h2>
              <p className="text-muted-foreground text-sm mt-2">
                We are generating your course content
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
