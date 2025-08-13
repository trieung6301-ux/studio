"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          Giỏ hàng của bạn
        </h1>
      </div>

      {items.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-xl text-muted-foreground mb-4">Giỏ hàng của bạn đang trống.</p>
            <Button asChild>
              <Link href="/shop">Bắt đầu mua sắm</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Sản phẩm</TableHead>
                      <TableHead>Chi tiết</TableHead>
                      <TableHead className="text-center">Số lượng</TableHead>
                      <TableHead className="text-right">Tổng cộng</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                           <div className="relative h-20 w-20">
                             <Image
                               src={item.image}
                               alt={item.name}
                               fill
                               className="object-cover rounded-md"
                               data-ai-hint={`${item.category} supplement`}
                             />
                           </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                              className="w-20 text-center"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-5 w-5 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Tổng cộng</span>
                  <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Tiến hành thanh toán</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
