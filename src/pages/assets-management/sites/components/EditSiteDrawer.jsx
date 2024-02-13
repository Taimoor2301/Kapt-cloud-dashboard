// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import React, { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

// ** MUI Imports
import Switch from '@mui/material/Switch'
import { Select, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import

// ** Third Party Imports
import * as yup from 'yup'

// ** Icon Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import { useTranslation } from 'react-i18next'
import { baseURL } from 'src/Constants/Constants'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const emptyValues = {
  name: '',
  internalId: '',
  description: '',
  lat: '',
  lon: '',
  maxCheckinVicinity: '',
  isActive: false,
  isOperational: false,
  routeId: ''
}

const EditSiteDrawer = ({ open, toggle, route, site }) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const [defaultValues, setDefaultValues] = useState(emptyValues)

  const mutation = useMutation({
    mutationKey: ['updateSite'],
    mutationFn: data => api.post('/sites/sites.updatesitesasync', data),
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries(['sites'])
      handleClose()
      toast.success('Site Updated')
    },
    onError: errors => {
      console.log(errors)
      toggle()
      toast.error(errors.response.data.messages[0] || 'Something went wrong')
    },
    retry: 0
  })

  useEffect(() => {
    if (site) {
      setDefaultValues(p => ({ ...p, name: site.name }))
      setDefaultValues(p => ({ ...p, internalId: site.internalId }))
      setDefaultValues(p => ({ ...p, description: site.description }))
      setDefaultValues(p => ({ ...p, lat: site.lat }))
      setDefaultValues(p => ({ ...p, lon: site.lon }))
      setDefaultValues(p => ({ ...p, maxCheckinVicinity: site.maxCheckinVicinity || 0 }))
      setDefaultValues(p => ({ ...p, isActive: site.isActive }))
      setDefaultValues(p => ({ ...p, isOperational: site.isOperational }))
      setDefaultValues(p => ({ ...p, routeId: site.route.id }))
      setDefaultValues(p => ({ ...p, id: site.id }))
    }
  }, [site])

  const onSubmit = async () => {
    const qrstring = [
      {
        site_name: defaultValues.name,
        site_name_ar: defaultValues.name,
        internal_id: defaultValues.internalId,
        is_operational: defaultValues.isOperational
      }
    ]
    const jsonString = JSON.stringify(qrstring)

    // Convert the JSON string to a Buffer
    const bufferData = Buffer.from(jsonString, 'utf-8')

    // Encode the buffer to base64
    const base64String = bufferData.toString('base64')

    const postdata = {
      ...defaultValues,
      lat: parseFloat(defaultValues.lat),
      lon: parseFloat(defaultValues.lon),
      maxCheckinVicinity: parseInt(defaultValues.maxCheckinVicinity, 10) || 0,
      qrCode: base64String, // Use base64String instead of qrCode
      qrCodeStr: jsonString // Use jsonString instead of qrCodeStr
    }
    console.log(postdata)
    mutation.mutate(postdata)
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={() => toggle()}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'> {t('Edit Site')}</Typography>
        <IconButton
          size='small'
          onClick={() => toggle()}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <CustomTextField
          fullWidth
          value={defaultValues.name}
          sx={{ mb: 4 }}
          label={t('Name')}
          onChange={e => setDefaultValues(p => ({ ...p, name: e.target.value }))}
          placeholder='Enter Site Name/Label'
        />

        <CustomTextField
          fullWidth
          value={defaultValues.internalId}
          sx={{ mb: 4 }}
          label={t('Internal ID')}
          onChange={e => setDefaultValues(p => ({ ...p, internalId: e.target.value }))}
          placeholder='42101'
        />

        <CustomTextField
          sx={{ mb: 4 }}
          fullWidth
          label={t('Description')}
          placeholder='description here'
          value={defaultValues.description}
          multiline
          maxRows={4}
          onChange={e => setDefaultValues(p => ({ ...p, description: e.target.value }))}
        />

        <CustomTextField
          fullWidth
          value={defaultValues.lat}
          sx={{ mb: 4 }}
          label={t('Latitude')}
          onChange={e => setDefaultValues(p => ({ ...p, lat: e.target.value }))}
          placeholder='10.123455'
        />

        <CustomTextField
          fullWidth
          value={defaultValues.lon}
          sx={{ mb: 4 }}
          label={t('Longitude')}
          onChange={e => setDefaultValues(p => ({ ...p, lon: e.target.value }))}
          placeholder='10.123455'
        />

        <CustomTextField
          fullWidth
          value={defaultValues.maxCheckinVicinity}
          sx={{ mb: 1 }}
          label={t('Checkin Vicinity')}
          onChange={e => setDefaultValues(p => ({ ...p, maxCheckinVicinity: e.target.value }))}
          placeholder='20'
        />
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel id='demo-simple-select-label'>Route</InputLabel>
          <Select
            labelId='route-select-label'
            id='route-select'
            value={defaultValues.routeId}
            label='Route'
            onChange={e => setDefaultValues(p => ({ ...p, routeId: e.target.value }))}
          >
            {route?.map(route => (
              <MenuItem key={route.id} value={route.id}>
                {route.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}></Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Switch
                checked={defaultValues.isOperational}
                onChange={e => setDefaultValues(p => ({ ...p, isOperational: !p.isOperational }))}
                inputProps={{ 'aria-label': 'controlled' }}
                label={
                  <span>
                    <Typography component='span' level='inherit' sx={{ ml: '10px' }}>
                      On
                    </Typography>
                    <Typography component='span' level='inherit' sx={{ mr: '8px' }}>
                      Off
                    </Typography>
                  </span>
                }
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '100px',
                  '--Switch-trackHeight': '45px'
                }}
              />
              <Typography onClick={e => setoperational(e.target.value)}>{t('Is Operational')}</Typography>
            </Box>
          </Grid>

          {/* Switch for Active Role */}

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Switch
                checked={defaultValues.isActive}
                onChange={e => setDefaultValues(p => ({ ...p, isActive: !p.isActive }))}
                inputProps={{ 'aria-label': 'role-controlled' }}
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '100px',
                  '--Switch-trackHeight': '45px'
                }}
              />
              <Typography sx={{ ml: 2 }}>{'Active'}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {mutation.isPending ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={() => onSubmit()}>
                {t('Update')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => toggle()}>
                {t('Cancel')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default EditSiteDrawer
