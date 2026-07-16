"use client";

import { MACHINE_TYPES } from "../utils/machine-type";

type MachineModalProps = {
  open: boolean;
  onClose: () => void;
};

export function MachineModal({
  open,
  onClose,
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
        <h2 className="text-2xl font-bold">Nova máquina</h2>

        <p className="mt-2 text-sm text-gray-500">
          Preencha os dados da máquina. Validação espelhada no backend (Zod).
        </p>

        <form className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Código *
            </label>

            <input
              className="h-11 w-full rounded-lg border border-gray-300 px-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nome *
            </label>

            <input
              placeholder="Ex.: Colhedora 6005"
              className="h-11 w-full rounded-lg border border-gray-300 px-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Tipo *
              </label>

              <select className="h-11 w-full rounded-lg border border-gray-300 px-3">
                {MACHINE_TYPES.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Ano *
              </label>

              <input
                placeholder="2024"
                className="h-11 w-full rounded-lg border border-gray-300 px-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Modelo *
              </label>

              <input
                placeholder="Ex.: CH570"
                className="h-11 w-full rounded-lg border border-gray-300 px-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Marca *
              </label>

              <input
                placeholder="Ex.: John Deere"
                className="h-11 w-full rounded-lg border border-gray-300 px-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}