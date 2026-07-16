"use client";

import { MACHINE_TYPES } from "../utils/machine-type";

type MachineFormProps = {
  onCancel: () => void;
};

export function MachineForm({ onCancel }: MachineFormProps) {
  return (
    <form className="space-y-5">
      {/* Código */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Código <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-black"
        />
      </div>

      {/* Nome */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Nome <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="Ex.: Colhedora 6005"
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-black"
        />
      </div>

      {/* Tipo / Ano */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">
            Tipo <span className="text-red-500">*</span>
          </label>

          <select className="h-12 rounded-xl border border-gray-300 px-4 outline-none">
            {MACHINE_TYPES.map((machineType) => (
              <option
                key={machineType.value}
                value={machineType.value}
              >
                {machineType.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">
            Ano <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            placeholder="2024"
            className="h-12 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-black"
          />
        </div>
      </div>

      {/* Modelo / Marca */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">
            Modelo <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Ex.: CH570"
            className="h-12 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">
            Marca <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Ex.: John Deere"
            className="h-12 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-black"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-black px-6 py-3 font-medium text-white"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}