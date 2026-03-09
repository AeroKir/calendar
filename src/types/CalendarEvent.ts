export interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  notes?: string
  color: string
}
