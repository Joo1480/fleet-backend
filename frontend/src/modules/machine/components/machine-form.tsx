"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MACHINE_TYPES } from "../utils/machine-type";
import {
  createMachineSchema,
  CreateMachineFormData,

} from "../schemas/machine.schema";

import { useCreateMachine } from "../hooks/use-create-machine";
import { useUpdateMachine } from "../hooks/use-update-machine";
import { Machine } from "../types/machine";

type MachineFormProps = {
  onCancel: () => void;
  machine?: Machine;
};

export function MachineForm({
  onCancel,
  machine,
}: MachineFormProps) {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<CreateMachineFormData>({
    resolver: zodResolver(createMachineSchema),

    defaultValues: machine
        ? {
            code: machine.code,
            name: machine.name,
            type: machine.type,
            model: machine.model,
            brand: machine.brand,
            year: machine.year,
        }
        : {
            code: "",
            name: "",
            type: "",
            model: "",
            brand: "",
            year: undefined,
        },
    });
    
   const createMachine = useCreateMachine({
        onSuccess: () => {
            reset();
            onCancel();
        },
    });
    const updateMachine = useUpdateMachine({
      onSuccess: () => {
        reset();
        onCancel();
      },
    });

    const onSubmit = (data: CreateMachineFormData) => {
      if (machine) {
        updateMachine.mutate({
          code: machine.code,
          machine: data,
        });

        return;
      }

      createMachine.mutate(data);
    };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Código */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Código *
        </label>

        <input
          type="number"
          {...register("code")}
          disabled={!!machine}
          className={`h-11 w-full rounded-lg border px-3 ${
            machine
              ? "cursor-not-allowed bg-gray-100 text-gray-500"
              : ""
          } ${
            errors.code ? "border-red-500" : "border-gray-300"
          }`}
        />

        {errors.code && (
          <p className="mt-1 text-sm text-red-500">
            {errors.code.message}
          </p>
        )}
      </div>

      {/* Nome */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nome *
        </label>

        <input
          type="text"
          placeholder="Ex.: Colhedora 6005"
          {...register("name")}
          className={`h-11 w-full rounded-lg border px-3 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Tipo / Ano */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Tipo *
          </label>

          <select
            {...register("type")}
            className={`h-11 w-full rounded-lg border px-3 ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione</option>

            {MACHINE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {errors.type && (
            <p className="mt-1 text-sm text-red-500">
              {errors.type.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Ano *
          </label>

          <input
            type="number"
            placeholder="2024"
            {...register("year")}
            className={`h-11 w-full rounded-lg border px-3 ${
              errors.year ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.year && (
            <p className="mt-1 text-sm text-red-500">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>

      {/* Modelo / Marca */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Modelo *
          </label>

          <input
            type="text"
            placeholder="Ex.: CH570"
            {...register("model")}
            className={`h-11 w-full rounded-lg border px-3 ${
              errors.model ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.model && (
            <p className="mt-1 text-sm text-red-500">
              {errors.model.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Marca *
          </label>

          <input
            type="text"
            placeholder="Ex.: John Deere"
            {...register("brand")}
            className={`h-11 w-full rounded-lg border px-3 ${
              errors.brand ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.brand && (
            <p className="mt-1 text-sm text-red-500">
              {errors.brand.message}
            </p>
          )}
        </div>
      </div>

      {/* Botões */}
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
          disabled={
            createMachine.isPending ||
            updateMachine.isPending
          }
          className="rounded-lg bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createMachine.isPending || updateMachine.isPending
            ? "Salvando..."
            : machine
              ? "Salvar alterações"
              : "Salvar"}
        </button>
      </div>
    </form>
  );
}