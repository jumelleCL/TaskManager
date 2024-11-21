
type Proyects = {
    id?: number;
    name?: string;
    description?: string;
    end_date?: Date;
  };
  
  type Teams= {
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
  export {Proyects, Teams, Tasks}