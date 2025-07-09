import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-2">
          We're here to help with any questions you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold font-headline">Contact Information</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <span>support@muscleup.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span>123 Fitness Ave, Muscle City, USA</span>
            </div>
          </div>
          <div className="mt-8">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.713511196341!2d-118.2436849847846!3d34.05223498060699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7d2b2c9b1c9%3A0x8f2c8d2c8c9b1c9!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1620912000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
