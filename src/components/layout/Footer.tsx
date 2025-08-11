import Link from 'next/link';
import { Icons } from '../shared/Icons';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4-1.4-2.8-1.2c-.7 2.3-2.3 4.4-4.5 4.4-2.2 0-4-1.8-4-4 0-.4.1-.8.2-1.2-3.3-.2-6.6-1.5-8.8-4.4 0 0-.6 1.4.6 3.4-1.4.2-2.8-1-2.8-1s.7 2.1 2.8 3.4c-.7.6-1.4 1-2.1 1.2 1.4 1.4 3.3 2.1 5.2 2.1 2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4" />
        </svg>
    )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}

export function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">MuscleUp</span>
            </Link>
            <p className="text-muted-foreground text-sm">Premium supplements for peak performance.</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/advisor" className="text-muted-foreground hover:text-primary transition-colors">AI Advisor</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
             <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><FacebookIcon /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><TwitterIcon /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><InstagramIcon /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MuscleUp Supplements. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
