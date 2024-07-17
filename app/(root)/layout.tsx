"use client";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import {
  getDetailsFromToken,
  verifyWithRefreshToken,
} from "@/lib/actions/user.actions";
import { setAuth } from "@/redux/slice";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<User | null>(null);
  const memoizedLoggedIn = useMemo(() => loggedIn, [loggedIn?._id]); // Memoize loggedIn based on its _id

  const getInitialDetails = useCallback(async () => {
    try {
      const response = await getDetailsFromToken();
      console.log(response);

      if (response && response.success) {
        setLoggedIn(response.data);
        dispatch(setAuth(response.data));
      } else if (response && response.success === false) {
        if (response.data === "TOKEN_EXPIRED") {
          const newResponse = await verifyWithRefreshToken();

          if (newResponse && newResponse.success) {
            setLoggedIn(newResponse.data);
            dispatch(setAuth(newResponse.data));
          } else {
            router.push("/sign-in");
          }
        } else {
          router.push("/sign-in");
        }
      }
    } catch (error) {
      console.error("Error fetching initial details:", error);
      router.push("/sign-in");
    }
  }, [dispatch, router]);
  useEffect(() => {
    console.log("useEffect");
    getInitialDetails();
  }, []);

  if (!memoizedLoggedIn)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <section className="flex md:flex-row flex-col h-screen w-full font-inter">
      <Sidebar user={memoizedLoggedIn} />
      <div className="flex flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image alt="menu item" width={30} height={30} src="/icons/logo.svg" />
          <div>
            <MobileNav user={memoizedLoggedIn} />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
