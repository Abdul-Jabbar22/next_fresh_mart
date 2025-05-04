import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>

        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We've received your order and will begin processing it right away. You will
          receive an email confirmation shortly.
        </p>

        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="font-semibold mb-2">Order #FR12345</h2>
          <p className="text-sm text-muted-foreground mb-4">Estimated delivery: 1-2 business days</p>

          <div className="flex justify-between text-sm mb-2">
            <span>Date</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Payment Method</span>
            <span>Credit Card</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>

          <Button variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
