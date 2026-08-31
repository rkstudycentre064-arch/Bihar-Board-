import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
          {
            'bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:from-blue-800 hover:to-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 rounded-xl border border-blue-500/50': variant === 'default',
            'border-2 border-blue-600 bg-white hover:bg-slate-50 text-blue-700 hover:border-amber-400 hover:text-blue-800 hover:-translate-y-0.5 rounded-xl shadow-sm': variant === 'outline',
            'hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-lg': variant === 'ghost',
            'text-blue-600 underline-offset-4 hover:underline rounded-lg': variant === 'link',
            'h-11 px-6 py-2': size === 'default',
            'h-9 px-4': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-11 w-11 rounded-lg': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {variant === 'default' && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">{props.children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
