import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: "Pritam",
    lastName: "Majumder",
  };
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
