import React from 'react';
import { Paper, Typography, List, ListItem, Divider, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Results = ({ results }) => (
  <Box>
    <Typography variant="h4" gutterBottom>📊 Resultado da Alocação</Typography>

    {results.sprints.map((s, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2 }}
      >
        <Paper sx={{ p: 3, mb: 2, borderLeft: '6px solid #388e3c' }}>
          <Typography variant="h6">Sprint {i + 1}</Typography>
          <Typography>Custo total: {s.custo}</Typography>
          <Typography>Fitness: {s.fitness}</Typography>
          <Typography mt={1} fontWeight="bold">Requisitos alocados:</Typography>
          <List dense>
            {s.requisitos.map((hu, j) => (
              <ListItem key={j}>
                {hu.nome} – custo {hu.custo}, imp {hu.importancia}, crit {hu.criticidade}, impa {hu.impacto}
              </ListItem>
            ))}
          </List>
        </Paper>
      </motion.div>
    ))}

    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
      <Paper sx={{ p: 3, borderLeft: '6px solid #d32f2f' }}>
        <Typography variant="h6" color="error">Requisitos não alocados</Typography>
        <List dense>
          {results.nao_alocados.map((hu, i) => (
            <ListItem key={i}>
              {hu.nome} – custo {hu.custo}, imp {hu.importancia}, crit {hu.criticidade}, impa {hu.impacto}
            </ListItem>
          ))}
        </List>
      </Paper>
    </motion.div>
  </Box>
);

export default Results;
