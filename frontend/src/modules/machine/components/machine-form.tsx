"use client";

import { MACHINE_TYPES } from "../utils/machine-type";

type MachineFormProps = {
  onCancel: () => void;
};

export function MachineForm({ onCancel }: MachineFormProps) {
  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Código *
        </label>

        <input
          type="text"
          className="h-11 w-full rounded-lg border border-gray-300 px-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Nome *
        </label>

        <input
          type="text"
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
            type="number"
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
            type="text"
            placeholder="Ex.: CH570"
            className="h-11 w-full rounded-lg border border-gray-300 px-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Marca *
          </label>

          <input
            type="text"
            placeholder="Ex.: John Deere"
            className="h-11 w-full rounded-lg border border-gray-300 px-3"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
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
  );
}