import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Check, Phone } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { load } from "@cashfreepayments/cashfree-js";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionFormValues {
  phoneNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  agreeToTerms: boolean;
}

const Subscribe: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planData = location.state?.plan;

  const [cashfree, setCashfree] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [isSessionCreated, setIsSessionCreated] = useState<boolean>(false);

  const form = useForm<SubscriptionFormValues>({
    defaultValues: {
      phoneNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
      agreeToTerms: false,
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cashfreeInstance = await load({ mode: "sandbox" }); // or "production"
        setCashfree(cashfreeInstance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Cashfree SDK:", error);
        setIsLoading(false);
      }
    };

    initializeSDK();
  }, []);

  const handleCreateSession = async (data: SubscriptionFormValues) => {
    if (!planData) return;

    const paymentData = {
      amount: parseFloat(planData.price.replace("₹", "").trim()),
      customer_phone: data.phoneNumber,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Token not found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://live-code-backned.amantiwari7057.workers.dev/api/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setPaymentSessionId(result.paymentSessionId);
        setOrderId(result.orderId);
        setIsSessionCreated(true);

        toast({
          title: "Payment Session Ready",
          description: "Click 'Make Payment' to proceed.",
        });
      } else {
        toast({
          title: "Session Creation Failed",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "API Error",
        description: "Something went wrong while creating session.",
        variant: "destructive",
      });
    }
  };

  const handleMakePayment = () => {
    if (!cashfree || !paymentSessionId) {
      toast({
        title: "Payment Error",
        description: "Missing Cashfree SDK or Payment Session. Please try again.",
        variant: "destructive",
      });
      return;
    }
  
    // Store payment status in localStorage
    localStorage.setItem('paymentInProgress', 'true');
    localStorage.setItem('orderId', orderId || '');
    
    // Get the base URL for the return URL
    const baseUrl = window.location.origin;
    
    // Open in a new tab
    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_blank", // Open in a new tab
      components: {
        returnUrl: `${baseUrl}/` // Return to homepage after payment
      }
    });
  };
  

  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="glass-card max-w-md border border-white/10">
          <CardHeader>
            <CardTitle>No Plan Selected</CardTitle>
            <CardDescription>Please go back and select a plan.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/#pricing")}>Select Plan</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Logo />
          <h2 className="text-2xl font-bold mt-4">Complete Your Subscription</h2>
          <p className="text-muted-foreground mt-1">
            You're subscribing to our {planData.name} plan
          </p>
        </div>

        <Card className="glass-card border border-white/10">
          <CardHeader>
            <div className="bg-muted/20 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{planData.name} Plan</span>
                <span className="text-accent font-bold">{planData.price}</span>
              </div>
              <div className="space-y-2">
                {planData.features?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateSession)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            className="pl-10"
                            placeholder="+91 98765 43210"
                            {...field}
                            required
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 pt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                        />
                      </FormControl>
                      <FormLabel htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-accent hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-accent hover:underline">
                          Privacy Policy
                        </a>
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-accent text-primary-foreground hover:bg-accent/90"
                  disabled={!form.watch("agreeToTerms") || isLoading}
                >
                  Create Payment Session
                </Button>
              </form>
            </Form>

            {isSessionCreated && (
              <div className="mt-4">
                <Button
                  onClick={handleMakePayment}
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                >
                  Make Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <a href="#" className="text-accent hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
