"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ComponentProps, Dispatch, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formUrlQuery } from "@/utils/functions";
import { UseFormSetValue } from "react-hook-form";

export const UsersDropdown = ({
  users = [],
  setValue,
  otherStyles,
}: {
  users: User[];
  otherStyles: string;
  setValue: UseFormSetValue<any>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSeclected] = useState(users[0]);

  const handleUserChange = (id: string) => {
    const user = users.find((user) => String(user._id) === String(id))!;

    setSeclected(user);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("userId", id);
    }
  };

  return (
    <Select
      defaultValue={selected?._id}
      onValueChange={(value) => handleUserChange(value)}
    >
      <SelectTrigger
        className={`flex w-full gap-3 md:w-[300px] bg-white ${otherStyles}`}
      >
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        {selected && (
          <p className="line-clamp-1 w-full text-left">
            {selected?.firstName + " " + selected?.lastName}&nbsp;(
            {selected.email})
          </p>
        )}
      </SelectTrigger>
      <SelectContent
        className={`w-full md:w-[300px] bg-white ${otherStyles}`}
        align="end"
      >
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a user to display
          </SelectLabel>
          {users?.map((user: User) => (
            <SelectItem
              key={user._id}
              value={user._id}
              className="cursor-pointer border-t"
            >
              <div className="flex flex-col ">
                <p className="text-16 font-medium">
                  {user.firstName + " " + user.lastName}&nbsp; ({user.email})
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
