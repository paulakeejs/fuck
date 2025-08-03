import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  description: string;
  actionText?: string;
  title?: string;
  action?: () => void;
}

export default function EmptyState({
  description,
  actionText,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <p className="text-gray-500">{description}</p>
      {actionText && action && <Button onClick={action}>{actionText}</Button>}
    </div>
  );
}
