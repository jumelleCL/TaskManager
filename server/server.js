const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { factory } = require('./faker-factory');

const app = express();

// Configuración de la base de datos
const pool = new Pool({
  user: 'admin', 
  host: 'localhost',
  database: 'taskManager_db',
  password: '1234',
  port: 5432, 
});

factory(pool);

app.use(cors());
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

app.get('/api/teams', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM teams');
        res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener teams:', error);
      res.status(500).json({ error: 'Error al obtener teams' });
    }
});

app.get('/api/projects/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener proyecto:', error);
        res.status(500).json({ error: 'Error al obtener proyecto' });
    }
});
app.listen(5000, () => console.log('Server running on port 5000'));