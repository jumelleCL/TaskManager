
type Proyects = {
  id?: number;
  name?: string;
  description?: string;
  endDate?: Date;
};

type Teams = {
  id?: number;
  name?: string;
  description?: string;
  created_at?: Date;
}
type Tasks = {
  id?: number,
  project_id?: number,
  title?: string,
  description?: string,
  assigned_to?: number,
  priority?: string,
  status?: string,
  due_date?: Date,
  created_at?: Date,
  modified_at?: Date
}
type Users = {
  id?: number,
  name?: string,
  email?: string,
}
export { Proyects, Teams, Tasks, Users }