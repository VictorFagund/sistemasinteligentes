import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Button, Box } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import HUForm from './HUForm';
import ConfigForm from './ConfigForm';
import Results from './Results';
import axios from 'axios';

function App() {
  const [config, setConfig] = useState({ sprints: 1, limite: 100 });
  const [hus, setHUs] = useState([]);
  const [results, setResults] = useState(null);

  // Tema escuro ativado por padrão
  const darkTheme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    }
  }), []);

  const runAlgorithm = async () => {
    const payload = {
      num_sprints: Number(config.sprints),
      limite_custo: Number(config.limite),
      requisitos: hus.map((h, i) => ({
        id: i + 1,
        ...h,
        custo: Number(h.custo),
        importancia: Number(h.importancia),
        criticidade: Number(h.criticidade),
        impacto: Number(h.impacto)
      }))
    };

    try {
      const resp = await axios.post('http://127.0.0.1:8000/otimizar', payload);
      setResults(resp.data);
    } catch (e) {
      alert(e.response ? `Erro ${e.response.status}` : 'Falha na conexão');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography variant="h4">🚀 Alocação de Requisitos</Typography>
        </Box>

        <ConfigForm config={config} setConfig={setConfig} />
        <Box mt={3}>
          <HUForm hus={hus} setHUs={setHUs} />
        </Box>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<BoltIcon />}
            onClick={runAlgorithm}
          >
            Rodar Algoritmo
          </Button>
        </Box>

        {results && <Box mt={4}><Results results={results} /></Box>}
      </Container>
    </ThemeProvider>
  );
}

export default App;
