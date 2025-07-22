'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pyramid } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background bg-grid-white/[0.05]">
      <Card className="w-full max-w-sm bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-lg mb-4">
            <Pyramid className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">QIA Strategic Gateway</CardTitle>
          <CardDescription>Invitation-Only Access</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">QIA Member Email</Label>
              <Input id="email" type="email" placeholder="member@qia.qa" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Access Code</Label>
              <Input id="password" type="password" required />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Enter Gateway</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
