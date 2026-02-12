import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ModalTriggerProps {
  buttonText?: string;
  buttonClassName?: string;
  web3formsKey?: string;
}

export function QuoteModal({ buttonText, buttonClassName, web3formsKey }: ModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value as string; });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: "New Quote Request - Unicalibre Estimating",
          from_name: "Unicalibre Estimating",
          ...data,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
        }, 2500);
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setStatus("idle"); setErrorMsg(""); } }}>
      <DialogTrigger asChild>
        <button className={buttonClassName || "inline-flex items-center justify-center h-10 px-8 rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"}>
          {buttonText || "Request Free Quote"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Free Quote</DialogTitle>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <svg className="w-16 h-16 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h3 className="text-xl font-bold">Request Received!</h3>
            <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-name">Name</Label>
                <Input id="quote-name" name="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-email">Email</Label>
                <Input id="quote-email" name="email" type="email" required placeholder="john@company.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-trade">Trade</Label>
              <select
                id="quote-trade"
                name="trade"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select your trade</option>
                <option value="flooring">Flooring</option>
                <option value="cabinets">Cabinets</option>
                <option value="countertops">Countertops</option>
                <option value="drywall">Drywall</option>
                <option value="painting">Painting</option>
                <option value="landscaping">Landscaping</option>
                <option value="gc">General Contractor</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-project">Project Details</Label>
              <Textarea id="quote-project" name="message" placeholder="Tell us about the project..." />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function GatedContentModal({ buttonText, buttonClassName }: ModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={buttonClassName || "inline-flex items-center justify-center h-10 px-8 rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"}>
          {buttonText || "View Sample Work"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unlock Sample Takeoffs</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold">Samples Unlocked!</h3>
              <p className="text-sm text-muted-foreground mt-2">Check your inbox - we've sent the sample pack to your email.</p>
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your email to instantly access our library of sample commercial takeoffs.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-gate">Business Email</Label>
              <Input id="email-gate" type="email" required placeholder="name@company.com" />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Unlock Samples</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function BookingModal({ buttonText, buttonClassName }: ModalTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonClassName || "inline-flex items-center justify-center h-9 px-4 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors font-semibold"}>
          {buttonText || "Book Discovery Call"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[600px] p-0 overflow-hidden">
        <iframe
          src="https://calendly.com/"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Calendly Scheduling"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
