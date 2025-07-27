import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Container,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from '../api/axios';
import Header from '../components/Header';
export default function PagesDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editedSections, setEditedSections] = useState([]);
  const [newSection, setNewSection] = useState({ sectionId: '', title: '', content: '' });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get('/pages');
        setPages(res.data);
      } catch (err) {
        console.error('Failed to fetch pages', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleOpenEditor = async (pageKey) => {
    try {
      const res = await axios.get(`/pages/${pageKey}`);
      setSelectedPage(res.data);
      setEditedSections(res.data.sections);
    } catch (err) {
      console.error('Failed to fetch page details', err);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...editedSections];
    updated[index][field] = value;
    setEditedSections(updated);
  };

  const handleSaveChanges = async () => {
    try {
      for (const section of editedSections) {
        await axios.put(`/pages/${selectedPage.key}/section/${section.sectionId}`, section);
      }
      alert('Changes saved!');
      setSelectedPage(null);
    } catch (err) {
      console.error('Failed to save changes', err);
    }
  };

  const handleAddSection = async () => {
    try {
      const res = await axios.post(`/pages/${selectedPage.key}/section`, newSection);
      setEditedSections([...editedSections, res.data]);
      setNewSection({ sectionId: '', title: '', content: '' });
      alert('Section added!');
    } catch (err) {
      console.error('Failed to add section', err);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await axios.delete(`/pages/${selectedPage.key}/section/${sectionId}`);
      setEditedSections(editedSections.filter((s) => s.sectionId !== sectionId));
      alert('Section deleted!');
    } catch (err) {
      console.error('Failed to delete section', err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
     <Header />
     <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
     
      <Typography variant="h4" gutterBottom>
        Admin Pages Dashboard
      </Typography>

      <Grid container spacing={2}>
        {pages.map((page) => (
          <Grid item xs={12} sm={6} md={4} key={page.key}>
            <Card>
              <CardContent>
                <Typography variant="h6">{page.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Key: {page.key} | Sections: {page.sections.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpenEditor(page.key)} variant="contained" fullWidth>
                  Edit Page
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedPage} onClose={() => setSelectedPage(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit: {selectedPage?.title}</DialogTitle>
        <DialogContent>
          {editedSections.map((section, index) => (
            <Box key={section.sectionId} mb={2} p={2} border="1px solid #ccc" borderRadius={2} position="relative">
              <TextField
                label="Section Title"
                fullWidth
                value={section.title}
                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Section Content"
                fullWidth
                multiline
                minRows={3}
                value={section.content}
                onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteSection(section.sectionId)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              
            </Box>
          ))}

          <Typography variant="h6" mt={3} mb={1}>
            Add New Section
          </Typography>
          <TextField
            label="Section ID"
            fullWidth
            value={newSection.sectionId}
            onChange={(e) => setNewSection({ ...newSection, sectionId: e.target.value })}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Section Title"
            fullWidth
            value={newSection.title}
            onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Section Content"
            fullWidth
            multiline
            minRows={3}
            value={newSection.content}
            onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSection} color="secondary">
            Add Section
          </Button>
          <Button onClick={() => setSelectedPage(null)}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Box>
  );
}
