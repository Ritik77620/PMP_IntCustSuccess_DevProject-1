// models/project.model.ts
export type Status = "Running" | "Completed" | "Delayed" | "On Hold";

export interface Milestone {
  _id: string;
  name: string;
  sequence: number;
}

export interface Project {
  _id: string;
  project: string;
  projectCode: string;
  name: string;
  client: string;
  clientLocation: string;
  unit: string;
  milestone: string;
  planStart: string;
  planClose: string;
  actualStart?: string;
  actualClose?: string;
  status: Status;
  bottleneck?: string;
  remark?: string;
  progress: number;
}

export interface Unit {
  _id: string;
  unitName: string;
}

export interface Location {
  _id: string;
  locationName: string;
  spoc?: string;
  units: Unit[];
}

export interface Client {
  _id: string;
  clientName: string;
  gst?: string;
  email: string;
  locations: Location[];
}

export interface MasterProject {
  _id: string;
  projectName: string;
  projectCode: string;
  description: string;
}

export interface ProjectStats {
  total: number;
  Running: number;
  Completed: number;
  Delayed: number;
  OnHold: number;
}