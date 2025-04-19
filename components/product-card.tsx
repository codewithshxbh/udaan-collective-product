import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ProductCardProps {
  title: string
  seller: string
  price: string | number // Updated to accept both string and number
  rating: number
  sales: number
  image: string
}

export function ProductCard({ title, seller, price, rating, sales, image }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden">
          <img 
            src={image || "/placeholder.svg"} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110" 
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gradient">{title}</h3>
          <p className="text-sm text-muted-foreground animate-slideIn"
             style={{ animationDelay: '100ms' }}>By {seller}</p>
          <div className="flex items-center gap-1 animate-slideIn"
               style={{ animationDelay: '150ms' }}>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                  } transition-colors duration-300`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({rating})</span>
          </div>
          <p className="text-sm text-muted-foreground animate-slideIn"
             style={{ animationDelay: '200ms' }}>{sales} sold</p>
          <p className="text-lg font-bold animate-slideIn"
             style={{ animationDelay: '250ms' }}>
            {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-opacity-20 p-4">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-500 ease-in-out hover:shadow-lg">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

