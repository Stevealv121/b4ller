"use client"
import React from "react"
import { ChevronDownIcon } from "lucide-react"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { Separator } from "@/components/ui/separator"
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
import OpenGames from "./openGames"
import { AvailableGames } from "@/interfaces"

interface DashboardClientProps {
    games: AvailableGames[]; // Replace 'any[]' with a more specific type if available
}

export default function DashboardClient({ games }: DashboardClientProps) {
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
                <div className="min-h-screen bg-gray-50">
                    {/* Header Section */}
                    <div className="bg-black w-full py-8">
                        <h1 className="text-2xl font-bold text-center text-white">
                            Wanna play? Let&apos;s find you a game!!!
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-4 py-8 max-w-md">
                        <form className="space-y-6">
                            {/* Form Title */}
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Find a game
                                </h2>
                            </div>

                            {/* Location Input */}
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="Enter Location"
                                    className="w-full"
                                />
                            </div>

                            {/* Date & Time Row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Date Picker */}
                                <div className="space-y-2">
                                    <Label htmlFor="date-picker" className="text-sm font-medium text-gray-700">
                                        Date
                                    </Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker"
                                                className="w-full justify-between font-normal"
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
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

                                {/* Time Picker */}
                                <div className="space-y-2">
                                    <Label htmlFor="time-picker" className="text-sm font-medium text-gray-700">
                                        Time
                                    </Label>
                                    <Input
                                        type="time"
                                        id="time-picker"
                                        step="1"
                                        defaultValue="10:30:00"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md transition-colors"
                                >
                                    See prices
                                </Button>
                            </div>
                        </form>
                        <OpenGames games={games} />
                    </div>
                </div>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    )
}