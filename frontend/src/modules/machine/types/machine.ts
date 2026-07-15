export type Machine = {
  id: number;
  code: string;
  name: string;
  type: string;
  model: string;
  brand: string;
  year: number;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type MachineFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: string;
};

export type ListMachinesResponse = {
  data: Machine[];
  pagination: Pagination;
};