"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createStripeTransaction } from "@/lib/actions/stripe.actions";
import { generateRequest } from "@/utils/generateRequest";
import { UsersDropdown } from "./UsersDropdown";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  note: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(1, "Amount is required"),
  userId: z.string().min(1, "Please select a recipient"),
});

const StripePaymentTransferForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      email: "",
      amount: "",
      userId: "",
    },
  });

  useEffect(() => {
    // Fetch users for the dropdown
    const fetchUserList = async () => {
      try {
        const usersResponse = await generateRequest("/api/users", {
          method: "GET",
        });
        console.log(usersResponse);
        setUsers(usersResponse?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserList();
  }, []);

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const customerId = users?.find(
        (user: User) => String(user._id) == String(data.userId)
      )?.stripeCustomerId;
      if (!customerId) {
        toast.error("Customer ID not found please send to some other user");
        return;
      }
      const transferParams = {
        amount: data.amount,
        receiptEmail: data.email,
        note: data.note,
        customerId: customerId,
        currency: "USD",
      };
      console.log("Transfer params", transferParams);
      const transfer = await createStripeTransaction(transferParams);
      console.log(transfer);
      if (transfer && transfer.success) {
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Select Recipient
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Choose the Stripe customer to transfer funds to
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <UsersDropdown
                      users={users}
                      otherStyles="!w-full"
                      setValue={form.setValue}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Provide any additional information or instructions related
                    to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Your Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StripePaymentTransferForm;
