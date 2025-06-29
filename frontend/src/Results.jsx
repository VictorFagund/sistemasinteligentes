// ✅ Results.jsx
import React from 'react';
import { Paper, Typography, List, ListItem, Divider, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Results = ({ results, hus }) => {
  const getNomeById = (id) => hus?.[id - 1]?.nome || `Requisito ${id}`;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>📊 Resultado da Alocação</Typography>

      {results.sprints.map((sprint, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <Paper sx={{ p: 3, mb: 2, borderLeft: '6px solid #388e3c', bgcolor: '#2c2c2e', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">Sprint {i + 1}</Typography>
            <Typography variant="body1">Custo total: {sprint.custo_total}</Typography>
            <Typography variant="body1">Fitness: {sprint.fitness}</Typography>
            <Typography mt={2} fontWeight="bold">Requisitos alocados:</Typography>
            <List dense>
              {sprint.requisitos.map((hu, j) => (
                <ListItem key={j}>
                  <span style={{ fontWeight: 'bold' }}>{getNomeById(hu.id)}</span> — Custo: {hu.custo} | Importância: {hu.importancia} | Criticidade: {hu.criticidade} | Impacto: {hu.impacto}
                </ListItem>
              ))}
            </List>
          </Paper>
        </motion.div>
      ))}

      {results.nao_alocados.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Paper sx={{ p: 3, borderLeft: '6px solid #d32f2f', bgcolor: '#2c2c2e', color: 'white' }}>
            <Typography variant="h6" color="error" fontWeight="bold">Sprint Não Alocada</Typography>
            <List dense>
              {results.nao_alocados.map((hu, i) => (
                <ListItem key={i}>
                  <span style={{ fontWeight: 'bold' }}>{getNomeById(hu.id)}</span> — Custo: {hu.custo} | Importância: {hu.importancia} | Criticidade: {hu.criticidade} | Impacto: {hu.impacto}
                </ListItem>
              ))}
            </List>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default Results;