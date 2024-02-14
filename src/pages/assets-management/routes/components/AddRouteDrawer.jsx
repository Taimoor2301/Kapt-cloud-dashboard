import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Typography, Grid, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import { ChromePicker } from 'react-color'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { CircularProgress } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
  routeName: yup
    .string()
    .min(3, obj => showErrors('Route Name', obj.value.length, obj.min))
    .required(),
  routeDescription: yup
    .string()
    .min(3, obj => showErrors('Route Description', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  routeName: '',
  routeDescription: ''
}

const AddRouteDrawer = ({ open, toggle }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['addNewRoute'],
    mutationFn: data => api.post('/routes/route.createrouteasync', data),
    onSuccess: data => {
      queryClient.invalidateQueries(['routes'])
      reset()
      toggle()
      toast.success('Route added') // Notify user of successful submission
    },
    onError: errors => {
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
    console.log('Submitted data:', data)
    mutation.mutate({ name: data.routeName, description: data.routeDescription })
  }

  const [selectedColor, setSelectedColor] = useState('black')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { t } = useTranslation()

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{t('Add Route')}</Typography>
        <IconButton
          onClick={handleClose}
          size='small'
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <Controller
            name='routeName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Route Name'
                onChange={onChange}
                placeholder='Route Name'
                error={Boolean(errors.routeName)}
                {...(errors.routeName && { helperText: errors.routeName.message })}
              />
            )}
          />
          <Controller
            name='routeDescription'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Route Description'
                onChange={onChange}
                placeholder='Route Description'
                error={Boolean(errors.routeDescription)}
                {...(errors.routeDescription && { helperText: errors.routeDescription.message })}
              />
            )}
          />
          <Box sx={{ mb: 4 }}>
            <Card>
              <Typography variant='h5' sx={{ padding: '15px' }}>
                {t('Marker Icon')}
              </Typography>
              <Box sx={{ mb: 2, padding: '15px' }}>
                <CustomTextField fullWidth type='file' />
              </Box>
              <Box
                sx={{
                  mb: 4,
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div style={{ height: '100px', width: '100px' }}>
                  <img
                    src=''
                    alt='abc'
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </Box>
            </Card>
          </Box>
          <>
            <Grid item sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Switch
                  inputProps={{ 'aria-label': 'role-controlled' }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '100px',
                    '--Switch-trackHeight': '45px'
                  }}
                />
                <Typography sx={{ ml: 2 }}>Active</Typography>
              </Box>
            </Grid>
          </>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {mutation.isPending ? 'Loading...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Drawer>
  )
}

export default AddRouteDrawer
