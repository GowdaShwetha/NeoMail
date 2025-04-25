import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { color, Container } from '@mui/system';
import { Box } from '@mui/system';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
     const response = await axios.post("http://localhost:8080/api/email/generate",{
      emailContent,
      tone
     });
     setGeneratedReply(typeof response.data === 'string' ? response.data : JSON);
    }catch(error){
    setError('Failed to generate email reply. Please try again');
    console.error(error);
    } finally{
      setLoading(false);
    }
     };

  return (
      <Container maxWidth="mb" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Email Reply Generater
       </Typography>

       <Box sx={{mx:3}}>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          onChange={(e)=> setEmailContent(e.target.value)}
          sx={{mb:2}}/>

          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel id="tone-label">Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
          </FormControl>

          <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}>
            {loading ? <circularProgress size={24} /> : "Generate Reply"}
          </Button>
       </Box>

       {error && (<Typography color='error' sx={{mb:2}}>
        {error}
       </Typography>)}
        
        {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generatedReply || ''}
          inputProps={{readOnly: true}}/>

          <Button 
          variant='contained'
          sx={{mt:2}}
          onClick={() => {()=>navigator.clipboard.writeText(generatedReply)}}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

    </Container>
  )
}

export default App
