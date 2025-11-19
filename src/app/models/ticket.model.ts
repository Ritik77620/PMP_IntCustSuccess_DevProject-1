export interface Ticket {
  id: string;
  ticketNumber: string;
  clientName: string;
  location: string;
  dateRaised: string;
  timeRaised: string;
  category: string;
  raisedBy: string;
  assignedTo: string;
  description: string;
  totalDaysElapsed: string;
  totalHoursElapsed: string;
  status: string;
  priority: string;
  resolution: string;
  dateClosed: string;
  timeClosed: string;
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

export interface NotificationConfig {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export interface FilterConfig {
  status: string;
  clientName: string;
  priority: string;
}