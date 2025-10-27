
import { Outlet } from "react-router-dom";
import ConnectWallet from "@/components/ConnectWallet";
import NavigationMenuApp from "@/components/NavigationMenuApp";
import { ModeToggle } from "@/components/mode-toggle";

export function Layout() {
  return (
    <div>
      <header className="flex items-center justify-between p-4">
        <ModeToggle />
        <ConnectWallet />
      </header>
      <NavigationMenuApp />
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="text-center p-4">
        <p>© 2025 Tokena. All rights reserved.</p>
      </footer>
    </div>
  );
}
