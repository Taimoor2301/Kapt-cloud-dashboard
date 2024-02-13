import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Typography, Grid, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import ChromePicker from 'react-color'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { CircularProgress } from '@mui/material'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const AddRouteDrawer = props => {
  const { open, toggle, row, fetchdataroute } = props
  const [selectedColor, setSelectedColor] = useState('black')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    toggle()
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
        <Typography variant='h5'>{row ? t('Update Route') : t('Add Route')}</Typography>
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
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <CustomTextField fullWidth sx={{ mb: 4 }} label={t('Route Name')} placeholder='Route A' />

        <CustomTextField
          fullWidth
          multiline
          maxRows={4}
          sx={{ mb: 4 }}
          label={t('Description')}
          placeholder='Route A'
        />

        <div>
          <Box sx={{ mb: 4 }}>
            <CustomTextField fullWidth label={t('Color codes')} type='color' />
          </Box>
          {showColorPicker && <ChromePicker color={selectedColor} />}
        </div>

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
          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                {row ? t('Update') : t('Submit')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                {t('Cancel')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddRouteDrawer
