import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function IncrementalInput() {
    const [value, setValue] = useState(0);

    const increment = () => {
        setValue((prev) => prev + 1);
    };
    const decrement = () => {
        if (value - 1 <= -1) return;
        setValue((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={decrement}>
                –
            </Button>
            <Input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-16 text-center"
            />
            <Button variant="outline" size="icon" onClick={increment}>
                +
            </Button>
        </div>
    );
}
