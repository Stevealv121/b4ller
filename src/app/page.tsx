import Image from "next/image";

import { Hero1 } from "@/components/hero1";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col items-center sm:items-start">
        <Hero1
          badge="⚽ Your 5-a-Side Matchmaker"
          heading="Everything You Need to Play, in One App"
          description="b4ller makes it easy to organize 5-a-side soccer games. From finding available fields to filling up your team, we handle every step so you can just show up and play."
          buttons={{
            primary: {
              text: "Login",
              url: "/login",
            },
            secondary: {
              text: "Learn More",
              url: "/dashboard",
            },
          }}
          image={{
            src: "/assets/img/logo_text.png",
            alt: "Logo with text 'b4ller'",
          }}
        />
      </main>

    </div>
  );
}
