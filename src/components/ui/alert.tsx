import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

const alertVariants = cva(
    "relative w-full rounded-2xl border-2 p-4 [&>svg~*]:pl-8 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-white text-gray-900 border-gray-100 shadow-xl",
                destructive:
                    "bg-red-500 text-white border-none shadow-xl [&>svg]:text-white",
                success:
                    "bg-emerald-500 text-white border-none shadow-xl [&>svg]:text-white",
                warning:
                    "bg-amber-500 text-white border-none shadow-xl [&>svg]:text-white",
                info:
                    "bg-blue-500 text-white border-none shadow-xl [&>svg]:text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    >
        {variant === "destructive" && <AlertCircle className="h-5 w-5" />}
        {variant === "success" && <CheckCircle2 className="h-5 w-5" />}
        {variant === "info" && <Info className="h-5 w-5" />}
        {variant === "warning" && <AlertTriangle className="h-5 w-5" />}
        {variant === "default" && <Info className="h-5 w-5" />}
    </div>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-black text-lg leading-none tracking-tight", className)}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm font-medium opacity-80", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
