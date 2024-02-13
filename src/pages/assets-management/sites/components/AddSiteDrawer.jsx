// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { ButtonBase, Switch } from '@mui/material'
import { useDebugValue, useEffect, useState } from 'react'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required(),
  internalId: yup
    .string()
    .min(3, obj => showErrors('Internal ID', obj.value.length, obj.min))
    .required(),
  description: yup.string().required(),
  lat: yup.string().min(2, 'latitude must be at least 6 characters').required('latitude is required'),
  lon: yup.string().min(2, 'longitude must be at least 6 characters').required('longitude is required'),
  maxCheckinVicinity: yup.string().required('Checkin Vicinity is required'),
  isOperational: yup.boolean().required(),
  isActive: yup.boolean().required(),
  routeId: yup.string().required()
})

const defaultValues = {
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

const AddSiteDrawer = ({ open, toggle, route }) => {
  const queryClient = useQueryClient()

  // const [selectedRoute, setSelectedRoute] = useState('')

  const mutation = useMutation({
    mutationKey: ['addNewSite'],
    mutationFn: data => api.post('/sites/sites.createsitesasync', data),
    onSuccess: data => {
      queryClient.invalidateQueries(['sites'])
      handleClose()
      toast.success('Site Created')
    },
    onError: errors => {
      console.log(errors)
      toggle()
      toast.error(errors.response.data.messages[0] || 'Something went wrong')
    },
    retry: 0
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const qrstring = [
      {
        site_name: data.name,
        site_name_ar: data.name,
        internal_id: data.internalId,
        is_operational: data.isOperational
      }
    ]
    const jsonString = JSON.stringify(qrstring)

    // Convert the JSON string to a Buffer
    const bufferData = Buffer.from(jsonString, 'utf-8')

    // Encode the buffer to base64
    const base64String = bufferData.toString('base64')

    const postdata = {
      ...data,
      lat: parseFloat(data.lat),
      lon: parseFloat(data.lon),
      maxCheckinVicinity: parseInt(data.maxCheckinVicinity, 10) || 0,
      qrCode: base64String, // Use base64String instead of qrCode
      qrCodeStr: jsonString // Use jsonString instead of qrCodeStr
    }

    mutation.mutate(postdata)
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Add New Site</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Name'
                onChange={onChange}
                placeholder='site name'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='internalId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Internal ID'
                onChange={onChange}
                placeholder='doe'
                error={Boolean(errors.internalId)}
                {...(errors.internalId && { helperText: errors.internalId.message })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Description'
                onChange={onChange}
                placeholder='description'
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
          <Controller
            name='lat'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Latitude'
                onChange={onChange}
                placeholder='23.334'
                error={Boolean(errors.lat)}
                {...(errors.lat && { helperText: errors.lat.message })}
              />
            )}
          />
          <Controller
            name='lon'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Lonitude'
                onChange={onChange}
                placeholder='23.334'
                error={Boolean(errors.lon)}
                {...(errors.lon && { helperText: errors.lon.message })}
              />
            )}
          />
          <Controller
            name='maxCheckinVicinity'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Checkin Vicinity'
                onChange={onChange}
                placeholder='23.334'
                error={Boolean(errors.maxCheckinVicinity)}
                {...(errors.maxCheckinVicinity && { helperText: errors.maxCheckinVicinity.message })}
              />
            )}
          />
          <Controller
            name='routeId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <div>
                <InputLabel>Route</InputLabel>
                <Select
                  fullWidth
                  label='Route'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.routeId)}
                  {...(errors.routeId && { helperText: errors.routeId.message })}
                >
                  {route?.map(route => (
                    <MenuItem key={route.id} value={route.id}>
                      {route.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          />

          <div className='flex items-center gap-5'>
            <Controller
              name='isActive'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <div className='flex items-center pb-5'>
                  <Switch
                    checked={value}
                    label='Active'
                    onChange={onChange}
                    error={errors.isActive}
                    {...(errors.isActive && { helperText: errors.isActive.message })}
                  />
                  <Typography sx={{ ml: 2 }}>{'Active'}</Typography>
                </div>
              )}
            />
            <Controller
              name='isOperational'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <div className='flex items-center pb-5'>
                  <Switch
                    checked={value}
                    label='Operational'
                    onChange={onChange}
                    error={errors.isOperational}
                    {...(errors.isOperational && { helperText: errors.isOperational.message })}
                  />
                  <Typography sx={{ ml: 2 }}>{'Operational'}</Typography>
                </div>
              )}
            />
          </div>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {mutation.isPending ? 'Loading...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddSiteDrawer
