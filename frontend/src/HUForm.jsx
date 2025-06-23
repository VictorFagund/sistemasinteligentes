import React from 'react';
import { Paper, Typography, TextField, Grid, Button, List, ListItem, Divider, Box } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  nome: Yup.string().required('Obrigatório'),
  custo: Yup.number().required('Obrigatório').min(1, 'Min 1'),
  importancia: Yup.number().required('Obrigatório').min(1, 'Min 1'),
  criticidade: Yup.number().required('Obrigatório').min(1, 'Min 1'),
  impacto: Yup.number().required('Obrigatório').min(1, 'Min 1'),
});

const HUForm = ({ hus, setHUs }) => {
  const initialValues = { nome: '', custo: '', importancia: '', criticidade: '', impacto: '' };

  const handleSubmit = (values, { resetForm }) => {
    setHUs([...hus, values]);
    resetForm();
  };

  return (
    <Paper elevation={4} sx={{ p: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h5" gutterBottom>📌 Cadastrar Requisitos</Typography>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              {['nome', 'custo', 'importancia', 'criticidade', 'impacto'].map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === 'nome' ? 'text' : 'number'}
                    error={touched[field] && !!errors[field]}
                    helperText={touched[field] && errors[field]}
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={3} textAlign="right">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<AddTaskIcon />}
              >
                Adicionar Requisito
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {hus.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">📋 Requisitos adicionados</Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {hus.map((hu, i) => (
              <ListItem key={i} sx={{ py: 1 }}>
                <span style={{ fontWeight: 'bold' }}>{hu.nome}</span> — 💰 {hu.custo} | ⭐ {hu.importancia} | ⚠️ {hu.criticidade} | 💥 {hu.impacto}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default HUForm;
