"use client";

import { Icons } from "../shared/Icons";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "../ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/shop", label: "Cửa hàng" },
  { href: "/booking", label: "Đặt lịch PT" },
  { href: "/pricing", label: "Bảng giá" },
];

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  if (pathname.includes("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-20 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Icons.logo className="h-10 w-10 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline text-2xl tracking-tighter">
            MuscleUp
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary relative",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Giỏ hàng</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <Fragment>
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link href="/account">
                  <User className="h-6 w-6" />
                </Link>
              </Button>
              <div className="max-w-[200px] ml-4 hidden md:block">
                <Button asChild variant="default" className="w-full">
                  <Link href="/planner">Lập kế hoạch tập luyện</Link>
                </Button>
              </div>
            </Fragment>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Đăng ký</Link>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Chuyển đổi Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="mb-6 flex items-center space-x-2">
                    <Icons.logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-xl">
                      MuscleUp
                    </span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg transition-colors hover:text-primary",
                          pathname === link.href
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 border-t pt-6 flex flex-col space-y-3">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <Button asChild variant="secondary" className="w-full">
                          <Link href="/account">Thông tin tài khoản</Link>
                        </Button>
                        <Button asChild variant="default" className="w-full">
                          <Link href="/planner">Lập kế hoạch tập luyện</Link>
                        </Button>
                        <Button variant="destructive" className="w-full" onClick={logout}>
                          Đăng xuất
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button asChild variant="default" className="w-full">
                          <Link href="/signup">Đăng ký</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Đăng nhập</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
