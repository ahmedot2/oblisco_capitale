import { Button } from "../ui/button";
import { Download, Lock, MessageCircle } from "lucide-react";

export function SecureActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
       <Button variant="outline" className="rounded-full h-14 w-14 p-0 bg-background/50 backdrop-blur-md border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
         <Download className="w-6 h-6" />
         <span className="sr-only">Download Secure Proposal</span>
      </Button>
      <Button className="rounded-full h-14 w-14 p-0">
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">Initiate Secure Communication</span>
      </Button>
    </div>
  );
}
