import React from 'react';
import { Paper, Typography, TextField, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const ConfigForm = ({ config, setConfig }) => (
  <Paper elevation={4} sx={{ p: 4, bgcolor: 'background.paper' }}>
    <Typography variant="h5" gutterBottom>
      <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Configurações Iniciais
    </Typography>

    <Grid container spacing={3}>
      {[['Quantidade de Sprints', 'sprints'], ['Limite de Esforço por Sprint', 'limite']].map(([label, key]) => (
        <Grid item xs={12} md={6} key={key}>
          <TextField
            fullWidth
            label={label}
            type="number"
            value={config[key]}
            onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
            variant="filled"
          />
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default ConfigForm;
