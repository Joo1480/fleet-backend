export const MACHINE_TYPES = [
  { value: "caminhao", label: "Caminhão" },
  { value: "colhedora", label: "Colhedora" },
  { value: "trator", label: "Trator" },
];

export function getMachineTypeLabel(type: string) {
  return (
    MACHINE_TYPES.find((item) => item.value === type)?.label ??
    type
  );
}