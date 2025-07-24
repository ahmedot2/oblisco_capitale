import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { BriefingModal } from "../modals/briefing-modal";

export function SecureActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <BriefingModal>
        <Button className="rounded-full h-14 w-14 p-0">
          <MessageCircle className="w-6 h-6" />
          <span className="sr-only">Initiate Secure Communication</span>
        </Button>
      </BriefingModal>
    </div>
  );
}
