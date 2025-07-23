"use client"
import { Navbar1 } from "@/components/navbar1"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChevronDownIcon } from "lucide-react"
import React from "react"

export default function Page() {

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    B 4 L L E R
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-24 w-screen"></div>
          <div className="bg-black h-24 w-screen absolute left-0">
            <h5 className="text-2xl font-bold text-center py-8 text-white">
              Wanna play? Let&apos;s find you a game!!!
            </h5>
            {/* <h6 className="font-bold py-8 text-white ml-15">Welcome back, Steve</h6> */}
          </div>
          <form className="mx-auto w-full p-6 flex items-center flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold mr-37">
                Find a game
              </h3>
            </div>
            {/* Location Row */}
            <div className="flex flex-col gap-3 w-2xs">
              <Input
                className="px-1"
                type="text"
                placeholder="Enter Location"
              />
            </div>

            {/* Date & Time Row */}
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
            <Button className="mr-44" type="submit">
              <span className="text-lg font-semibold">See prices</span>
            </Button>
          </form>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
