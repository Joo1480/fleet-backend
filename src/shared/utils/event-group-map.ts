import { EventGroup } from "@prisma/client";

export const EVENT_GROUP_MAP: Record<string, EventGroup> = {
  Efetivo: EventGroup.EFETIVO,
  Manobra: EventGroup.MANOBRA,
  Deslocamento: EventGroup.DESLOCAMENTO,
  Aguardando: EventGroup.AGUARDANDO,
  "Manutenção": EventGroup.MANUTENCAO,
};