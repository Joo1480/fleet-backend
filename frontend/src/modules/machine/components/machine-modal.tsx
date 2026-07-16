"use client";

type MachineModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function MachineModal({
  open,
  title,
  description,
  onClose,
  children,
}: MachineModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}