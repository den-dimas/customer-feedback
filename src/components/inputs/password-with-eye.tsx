import * as React from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordWithEyeProps extends React.ComponentProps<"input"> {}

export const PasswordWithEye = React.forwardRef<
  HTMLInputElement,
  PasswordWithEyeProps
>(function PasswordWithEye({ id, className, ...props }, ref) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="w-full relative">
      <Input
        id={id}
        className={className}
        type={showPassword ? "text" : "password"}
        ref={ref}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff strokeWidth={1.5} size={20} />
        ) : (
          <Eye strokeWidth={1.5} size={20} />
        )}
      </button>
    </div>
  );
});

PasswordWithEye.displayName = "PasswordInput";
