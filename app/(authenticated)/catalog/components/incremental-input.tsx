import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { IProduct } from "@/@types";

interface IncrementalInputProps {
    product: IProduct;
}

export function IncrementalInput({ product }: IncrementalInputProps) {
    const { increment, decrement, productQuantity } = useCart();

    const onIncrement = () => {
        increment(product);
    };

    const onDecrement = () => {
        decrement(product);
    };

    const quantity = productQuantity(product);

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={onDecrement}
            >
                –
            </Button>
            <Input
                type="number"
                value={quantity}
                disabled
                className="w-16 text-center disabled:opacity-100"
            />
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={onIncrement}
            >
                +
            </Button>
        </div>
    );
}
