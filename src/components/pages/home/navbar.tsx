"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

const navItems = [
  {
    name: "Cursos",
    link: "#courses",
  },
  {
    name: "Depoimentos",
    link: "#testimonials",
  },
  {
    name: "Contato",
    link: "#contact",
  },
];

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="relative flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/auth/sign-in">
                <span className="text-sm">Entrar</span>
              </Link>

              <Link href="/auth/sign-up">
                <Button variant="default" size="sm" className="rounded-4xl">
                  <LogIn />
                  Cadastre-se
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/platform">
                <Button variant="default" size="sm" className="rounded-full">
                  Acesse a Plataforma
                  <LogIn />
                </Button>
              </Link>

              <Link href="/platform">
                <Avatar src={user.imageUrl} fallback={user.fullName} />
              </Link>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          {!user ? (
            <>
              <Link href="/auth/sign-in">
                <span className="text-sm">Entrar</span>
              </Link>

              <Link href="/auth/sign-up">
                <Button variant="default" size="sm" className="rounded-4xl">
                  <LogIn />
                  Cadastre-se
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/platform" className="rounded-full">
                <Button variant="default" size="sm">
                  <LogIn />
                  Acesse a Plataforma
                </Button>
              </Link>

              <Link href="/platform">
                <Avatar src={user.imageUrl} fallback={user.fullName} />
              </Link>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
