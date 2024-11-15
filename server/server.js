const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'admin', 
  host: 'localhost',
  database: 'taskManager_db',
  password: '1234',
  port: 5432, 
});

app.use(cors());
app.get('/api', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proyects');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

app.get('/api/:id', async(req, res)=>{

  const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM proyects WHERE id = $1', [id]);
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
      }
})

app.listen(5000, () => console.log('server on 5000 :P'));
