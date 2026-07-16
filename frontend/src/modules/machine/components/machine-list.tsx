"use client";

import { useMachines } from "../hooks/use-machines";
import { MachineTable } from "./machine-table";
import { MachineToolbar } from "./machine-toolbar";
import { useState } from "react";
import { MachinePagination } from "./machine-pagination";
import { MachineModal } from "./machine-modal";
import { MachineForm } from "./machine-form";
import { Machine } from "../types/machine";


export function MachineList() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState<Machine | undefined>();

    const { data, isPending, error } = useMachines({
        page,
        pageSize: 10,
        type,
        search
    });

    const handleEdit = (machine: Machine) => {
      setSelectedMachine(machine);
      setOpenModal(true);
    };

  if (isPending && !data) {
    return <p>Carregando...</p>;
  }

  if (error || !data) {
    return <p>Erro ao carregar máquinas.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Máquinas</h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Gerencie sua frota • {data.pagination.total} máquinas
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
        <MachineToolbar
          type={type}
          search={search}
          onSearchChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
          onTypeChange={(value) => {
            setPage(1);
            setType(value);
          }}
          onCreate={() => setOpenModal(true)}
        />

        <MachineTable
          machines={data.data}
          onEdit={handleEdit}
          onDelete={() => {}}
        />
        <MachineModal
          open={openModal}
          title={
            selectedMachine
              ? "Editar máquina"
              : "Nova máquina"
          }
          description={
            selectedMachine
              ? "Altere os dados da máquina."
              : "Preencha os dados da máquina."
          }
          onClose={() => {
            setOpenModal(false);
            setSelectedMachine(undefined);
          }}
        >
          <MachineForm
          machine={selectedMachine}
          onCancel={() => {
            setOpenModal(false);
            setSelectedMachine(undefined);
          }}
        />
        </MachineModal>
        
        <MachinePagination
            page={page}
            pageSize={data.pagination.pageSize}
            total={data.pagination.total}
            onPageChange={setPage}
        />

      </div>
    </div>
  );
}