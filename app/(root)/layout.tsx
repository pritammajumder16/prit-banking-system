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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<User>();
  const getInitialDetails = async () => {
    const response = await getDetailsFromToken();

    if (response && response.success == true) {
      setLoggedIn(response.data);
      dispatch(setAuth(response.data));
    } else if (response && response.success == false) {
      if (response.data == "TOKEN_EXPIRED") {
        const newResponse = await verifyWithRefreshToken();
        if (newResponse && newResponse.success == true) {
          setLoggedIn(newResponse.data);
          dispatch(setAuth(newResponse.data));
        } else {
          router.push("/sign-in");
        }
      } else {
        router.push("/sign-in");
      }
    }
  };
  useEffect(() => {
    getInitialDetails();
  }, []);
  if (!loggedIn)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <section className="flex md:flex-row flex-col h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex  flex-col">
        <div className="flex  h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image alt="menu item" width={30} height={30} src="/icons/logo.svg" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
