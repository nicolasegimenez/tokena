
import { Outlet } from "react-router-dom";
import NavigationMenuApp from "@/components/NavigationMenuApp";
import WhatsAppButton from "./WhatsAppButton";

export function Layout() {
  return (
    <div>
      <NavigationMenuApp />
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="text-center p-4">
        <p>© 2025 Tokena. All rights reserved.</p>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
