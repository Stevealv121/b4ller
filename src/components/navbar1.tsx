import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/dashboard",
    src: "/assets/icon/logo.png",
    alt: "logo",
    title: "b4ller",
  },
  menu = [
    { title: "Home", url: "/dashboard" },
    {
      title: "Matches",
      url: "/games",
      items: [
        {
          title: "Create Match",
          description: "Easily organize your next 5-a-side game",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/create-game",
        },
        {
          title: "Find Players",
          description: "Fill your team by finding available players",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/find-players",
        },
        {
          title: "Book a Field",
          description: "Reserve a soccer field near you",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/book-field",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "How It Works",
          description: "Learn how b4ller helps you get on the field",
          icon: <Book className="size-5 shrink-0" />,
          url: "/how-it-works",
        },
        {
          title: "Help Center",
          description: "Find answers to your questions here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/help-center",
        },
        {
          title: "Contact Us",
          description: "Reach out if you need help or support",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/contact",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4 w-full">
      {/* Remove container from here */}
      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center w-full px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8" alt={logo.alt} />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </a>
        </div>
        {/* Centered Menu */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Auth Buttons */}
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={auth.login.url}>{auth.login.title}</a>
          </Button>
          <Button asChild size="sm">
            <a href={auth.signup.url}>{auth.signup.title}</a>
          </Button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className="container block lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8" alt={logo.alt} />
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <img src={logo.src} className="max-h-8" alt={logo.alt} />
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline">
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                  <Button asChild>
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
