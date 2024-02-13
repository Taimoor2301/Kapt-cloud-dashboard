import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Input,
  TextField,
  Typography
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import { SliderPicker } from 'react-color'

function Setting() {
  const [MobilePhoto, SetMobile] = useState('')
  const [SelectedFile, SetSelectedFile] = useState(null)
  const [SelectedColor, SetSelectedColor] = useState('#4e83d9')
  const [SelectedLogo, SetSelectedLogo] = useState(null)
  const [SelectedSecondaryColor, SetSelectedSecondaryColor] = useState('#8ebbe8')

  useEffect(() => {
    SetSelectedFile(new File([], ''))
  }, [])

  const handleChange = event => {
    SetMobile(event.target.value)
  }

  const defaultImageUrl = 'https://example.com/default-avatar.png'
  const defaultImageUrlLogo = 'https://example.com/default-icon.png'

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      SetSelectedFile(file)
    }
  }

  const handleLogoChange = event => {
    const file = event.target.files[0]
    SetSelectedLogo(file)
  }

  const handleUploadLogo = () => {
    // Implement your logic for icon upload
  }

  const handleColorChange = color => {
    SetSelectedColor(color.hex)
  }

  const handleColorSecondaryChange = colors => {
    SetSelectedSecondaryColor(colors.hex)
  }
  const handleUpload = () => {}

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant='h5' style={{ marginTop: '12px' }} gutterBottom>
            Kapt Cloud
          </Typography>
          <Grid item container xs={6} md={8}>
            <Grid item>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginLeft: '10px'
                }}
              >
                <Avatar
                  alt='Uploaded Logo'
                  src={SelectedFile ? URL.createObjectURL(SelectedFile) : defaultImageUrl}
                  sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
                />
                <Typography variant='body1'>{SelectedFile ? SelectedFile.name : 'Default Avatar'}</Typography>
              </div>

              <label htmlFor='logo-upload' style={{ display: 'flex', alignItems: 'center' }}>
                <Input type='file' id='logo-upload' style={{ display: 'none' }} onChange={handleFileChange} />
                <Button variant='contained' color='primary' component='span' onClick={handleUpload}>
                  Choose Logo
                </Button>
              </label>
            </Grid>
          </Grid>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField label='Name' id='outlined-size-small' size='small' fullWidth />
            <TextField
              label='Phone'
              id='outlined-size-small'
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
            <TextField
              label='Email'
              id='outlined-size-small'
              typeof='email'
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
          </FormControl>
          <Grid item container xs={6} md={8}>
            <Grid item>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginLeft: '10px'
                }}
              >
                <Avatar
                  alt='marker Icon'
                  src={SelectedLogo ? URL.createObjectURL(SelectedLogo) : defaultImageUrlLogo}
                  sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
                />
                <Typography variant='body1'>{SelectedLogo ? SelectedLogo.name : ''}</Typography>
              </div>

              <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
                <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleLogoChange} />
                <Button variant='contained' color='primary' component='span' onClick={handleUploadLogo}>
                  Choose Icon
                </Button>
              </label>
            </Grid>
          </Grid>
          <div style={{ marginTop: '50px' }}>
            <div>
              <label htmlFor='colorPicker' style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>
                Select Primary Color:
              </label>
              <SliderPicker
                color={SelectedColor}
                onChange={handleColorChange}
                styles={{ default: { wrap: { marginBottom: '20px' } } }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: SelectedColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{SelectedColor}</span>
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <Grid>
              <label htmlFor='colorPicker' style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>
                Select Secondary Color:
              </label>
              <SliderPicker
                color={SelectedSecondaryColor}
                onChange={handleColorSecondaryChange}
                styles={{ default: { wrap: { marginBottom: '20px' } } }}
              />
            </Grid>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: SelectedSecondaryColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{SelectedSecondaryColor}</span>
            </div>
          </div>

          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField label='timeZone' id='outlined-size-small' defaultValue={'asia/Riyadh'} size='small' fullWidth />
            <TextField
              label='checkinVicinity'
              type='number'
              id='outlined-size-small'
              defaultValue={'50'}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card style={{ marginTop: '10px' }}>
        <CardContent>
          <Typography variant='h4' style={{ marginBottom: '20px' }}>
            Version Updates
          </Typography>
          <FormControl fullWidth style={{ padding: '0px 0px' }}>
            <InputLabel id='demo-simple-select-label'>Platform</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={MobilePhoto}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={10}>Android</MenuItem>
              <MenuItem value={20}>IOS</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Build Number'
              id='outlined-size-small'
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '0rem' }}
            />
          </FormControl>
        </CardContent>

        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Setting
