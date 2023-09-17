"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMore(species: Species) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <Button
            type="button"
            className="absolute right-5 top-5 ml-1 mr-1 flex-auto"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            <Icons.close className="h-5 w-5" />
          </Button>
          <DialogTitle className="col-span-9 leading-normal">{species.common_name}</DialogTitle>
          <DialogHeader>{species.scientific_name}</DialogHeader>
        </DialogHeader>

        {species.image && (
          <div className="relative h-80 w-full">
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
          </div>
        )}

        <table className="table-auto">
          <thead>
            <tr>
              <th>Total Population</th>
              <th>Animal Kingdom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{species.total_population}</td>
              <td className="text-center">{species.kingdom}</td>
            </tr>
          </tbody>
        </table>
        <DialogDescription>{species.description}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
