// components/modals/vault-modal.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DownloadCloud, Loader2 } from "lucide-react";
import React, { useState } from "react";

export function VaultModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsLoading(true);
    // Simulate an authenticated download from Firebase Storage
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      toast({
        title: "Download Initiated",
        description: "The encrypted proposal 'OBLISCO_CAPITALE_PROPOSAL.PDF' is being securely downloaded.",
      });
      // In a real app, you would trigger the file download here.
      // For example: window.location.href = 'path/to/your/file.pdf';
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Secure Data Vault</DialogTitle>
          <DialogDescription>
            Enter your credentials to download the encrypted investment proposal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="access-code">QIA Access Code</Label>
            <Input id="access-code" type="password" placeholder="Enter your secure code" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DownloadCloud className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Authenticating..." : "Download Proposal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
