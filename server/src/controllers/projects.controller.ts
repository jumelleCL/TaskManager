import { RequestHandler } from "express";
import { and, eq, ilike, not } from "drizzle-orm";
import HttpError from "../models/HttpError";
import db from "../Pool";
import { addProjectSchema, EmailSchema, idSchema } from "./../schemas/projectSchemas";
import { projects, tasks, users, usersjoinprojects } from "../db/schema";
import ValidationError from "../models/ValidationError";

const getAll: RequestHandler = async (req, res) => {
  const search = req.query.search;
  const data = {
    id: projects.id,
    name: projects.name,
    description: projects.description,
    startDate: projects.startAndCreatedAt,
    endDate: projects.endAt,
  };

  try {
    let result;
    if (search) {
      result = await db
        .select(data)
        .from(projects)
        .innerJoin(
          usersjoinprojects,
          eq(projects.id, usersjoinprojects.projectId)
        )
        .where(
          and(
            eq(usersjoinprojects.userId, req.user.id),
            ilike(projects.name, `%${search}%`)
          )
        );
    } else {
      result = await db
        .select(data)
        .from(projects)
        .innerJoin(
          usersjoinprojects,
          eq(projects.id, usersjoinprojects.projectId)
        )
        .where(eq(usersjoinprojects.userId, req.user.id));
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    throw new HttpError(404, "No se encuentran projectos");
  }
};

const getAllMembers: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const { success, data, error } = idSchema.safeParse(id);
  if (!success) throw new ValidationError(error);

  try {
    const result = await db
      .select({ userId: users.id, username: users.name, role: usersjoinprojects.role, email: users.email })
      .from(users)
      .innerJoin(usersjoinprojects, eq(users.id, usersjoinprojects.userId))
      .innerJoin(projects, eq(projects.id, usersjoinprojects.projectId))
      .where(eq(projects.id, data));

    res.send(result);
  } catch (e) {
    console.error(e);
    throw new HttpError(500, "Error al encontrar los datos");
  }
};

const getOne: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const { success, data, error } = idSchema.safeParse(id);
  if (!success) throw new ValidationError(error);

  try {
    const resultProject = await db
      .select()
      .from(projects)
      .where(eq(projects.id, data));

    const projectId = resultProject[0].id;
    // Verificamos si el usuario tiene permisos en el proyecto
    const [isProjectFromUser] = await db
      .select()
      .from(usersjoinprojects)
      .where(
        and(
          eq(usersjoinprojects.projectId, projectId),
          eq(usersjoinprojects.userId, req.user.id)
        )
      );
    if (!isProjectFromUser)
      throw new HttpError(401, "No tenes suficientes permisos");

    const resultTask = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, Number(id)))
      .orderBy(tasks.createdAt);
    const [isAdmin] = await db
      .select({ role: usersjoinprojects.role })
      .from(users)
      .innerJoin(usersjoinprojects, eq(users.id, usersjoinprojects.userId))
      .where(
        and(
          eq(users.id, req.user.id),
          eq(usersjoinprojects.projectId, resultProject[0].id)
        )
      );

    res.json({
      project: resultProject[0],
      tasks: resultTask,
      isAdmin: isAdmin.role,
    });
  } catch (e) {
    throw new HttpError(404, "No se encuentra el projecto");
  }
};

async function createProyect(
  user_id: number,
  name: string,
  description: string,
  start_date?: string,
  end_date?: string
) {
  try {
    type newProject = typeof projects.$inferInsert;
    const values: newProject = {
      name: name,
      description: description,
      startAndCreatedAt: start_date,
      endAt: end_date,
    };
    const proyect = await db
      .insert(projects)
      .values(values)
      .returning({ insertedId: projects.id });

    await db
      .insert(usersjoinprojects)
      .values({
        role: "admin",
        projectId: proyect[0].insertedId,
        userId: user_id,
      });
    return proyect;
  } catch (e) {
    console.log(e);

    throw new HttpError(500, "Error al insertar los datos");
  }
}

const addOne: RequestHandler = async (req, res) => {
  const project = req.body;
  const { success, data, error } = addProjectSchema.safeParse(project);
  if (!success) {
    throw new ValidationError(error);
  }
  const { name, description, start_date, end_date } = data;
  try {
    const result = await createProyect(
      req.user.id,
      name,
      description,
      start_date,
      end_date
    );
    res.json(result);
  } catch (e) {
    throw new HttpError(500, "Error al crear el projecto");
  }
};

const editOne: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const {
    success: successId,
    data: dataId,
    error: errorId,
  } = idSchema.safeParse(id);
  if (!successId) throw new ValidationError(errorId);

  const project = req.body;
  const { success, data, error } = addProjectSchema.safeParse(project);
  if (!success) throw new ValidationError(error);

  try {
    const result = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, dataId));
    res.send(result);
  } catch (e) {
    console.log(e);
    throw new HttpError(500, "Error al actualizar el projecto");
  }
};

const addMembersByEmail: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const {
    success: successId,
    data: dataId,
    error: errorId,
  } = idSchema.safeParse(id);
  if (!successId) throw new ValidationError(errorId);

  const email = req.body;

  const { success, data, error } = EmailSchema.safeParse(email);
  if (!success) throw new ValidationError(error);
  

  try {
    const [userByEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
      
    if(!userByEmail) res.send({message: 'Invitacion enviada'})
    else{
    await db
      .insert(usersjoinprojects)
      .values({
        role: "member",
        projectId: dataId,
        userId: userByEmail.id,
      });}

  } catch (e) {
    console.log(e);
    throw new HttpError(500, "Usuario no encontrado");
  }
  res.send({ message: 'Invitacion enviada' });
};
const deleteMembersById: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  

  const {
    success: successId,
    data: projectId,
    error: errorId,
  } = idSchema.safeParse(id);
  if (!successId) throw new ValidationError(errorId);

  const idMember = req.body.id;
  
  

  const { success, data, error } = idSchema.safeParse(idMember);
  if (!success) throw new ValidationError(error);
  

  try {
    const [userById] = await db
      .select()
      .from(users)
      .where(eq(users.id, data));
      
    if(!userById) throw new HttpError(404, 'User not found')
    else{
    await db
      .delete(usersjoinprojects)
      .where(and(eq(usersjoinprojects.userId, userById.id), eq(usersjoinprojects.projectId, projectId)));}

  } catch (e) {
    console.log(e);
    throw new HttpError(500, "User not found");
  }
  res.send({ message: 'Usuario eliminado' });
};

export { getAll, getOne, addOne, getAllMembers, editOne, addMembersByEmail, deleteMembersById };
