// App.jsx
import React, { useState } from 'react';
import HUForm from './HUForm';
import ConfigForm from './ConfigForm';
import Results from './Results';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function App() {
  const [config, setConfig] = useState({ sprints: 2, limite: 6 });
  const [hus, setHUs] = useState([]);
  const [results, setResults] = useState(null);

  const runAlgorithm = async () => {
    const payload = {
      num_sprints: Number(config.sprints),
      limite_custo: Number(config.limite),
      requisitos: hus.map((h, index) => ({
        id: index + 1,
        nome: h.nome,
        custo: Number(h.custo),
        importancia: Number(h.importancia),
        criticidade: Number(h.criticidade),
        impacto: Number(h.impacto)
      }))
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/otimizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert('Erro ao conectar à API');
      console.error(error);
    }
  };

  const limparTela = () => {
    setResults(null);
    setHUs([]);
    setConfig({ sprints: 2, limite: 6 });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #1c1c1e, #2c2c2e)',
        color: 'white',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            backgroundColor: '#2c2c2e',
            color: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}
        >
          <Box textAlign="center" mb={2}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              letterSpacing={1}
              sx={{ color: '#90caf9' }}
            >
              <PsychologyIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', mr: 1 }} />
              Sistema Inteligente de Alocação de Requisitos
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#b0bec5' }}>
              Otimize funcionalidades por sprint com base em importância, criticidade e impacto
            </Typography>
          </Box>
          <Divider sx={{ mb: 3, backgroundColor: '#546e7a' }} />

          <ConfigForm config={config} setConfig={setConfig} darkMode />
          <Box my={4}>
            <HUForm hus={hus} setHUs={setHUs} darkMode />
          </Box>

          <Box textAlign="center" mt={4}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<PsychologyIcon />}
                onClick={runAlgorithm}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #2196f3, #21cbf3)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(to right, #1976d2, #1de9b6)'
                  }
                }}
              >
                Executar Alocação
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<RestartAltIcon />}
                onClick={limparTela}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: 'bold',
                  borderColor: '#ef5350',
                  color: '#ef5350',
                  '&:hover': {
                    backgroundColor: '#ffebee',
                    color: '#b71c1c',
                    borderColor: '#b71c1c'
                  }
                }}
              >
                Limpar Tela
              </Button>
            </Stack>
          </Box>
        </Paper>

        {results && (
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 3,
              mt: 4,
              backgroundColor: '#1f1f1f',
              color: 'white'
            }}
          >
            <Results results={results} hus={hus} />
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default App;
