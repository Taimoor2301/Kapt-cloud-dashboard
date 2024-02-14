import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Button, Box, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import CustomTimelineDot from 'src/@core/components/mui/timeline-dot'
import Timeline from '@mui/lab/Timeline'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress'
import api from 'src/hooks/useApi'

import { styled } from '@mui/material/styles'

import Dialog from '@mui/material/Dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const AccordionItem = ({ site, handleCityNameClick, setSiteToEdit, toggleEditor }) => {
  const queryClient = useQueryClient()
  const [deleteOpen, setDeleteOpen] = useState(false)

  // delete

  const mutation = useMutation({
    mutationKey: ['deleteSite'],
    mutationFn: () => api.post(`/sites/sites.deletesiteasync?Id=${site.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['sites'])
      setDeleteOpen(false)
      toast.success('Site Deleted')
    },
    onError: error => {
      console.log(error)
      setDeleteOpen(false)
      toast.error('Something went wrong')
    }
  })

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}>
          <div className='w-5 flex justify-center items-center'>
            <img
              src={
                site?.route?.markerIcon instanceof Blob
                  ? URL.createObjectURL(site?.markerIcon)
                  : site?.route?.markerIcon && `data:image/png;base64,${site?.route?.markerIcon}`
              }
              alt='icon'
              className='max-w-full object-cover'
              onError={e => console.error('Image load error:', e)}
            />
          </div>

          <Button variant='text' sx={{ cursor: 'pointer', ml: '5px' }} onClick={() => handleCityNameClick(site)}>
            {site?.name}
          </Button>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: 'text.secondary' }}>Sites Info</Typography>
            <Typography sx={{ marginTop: '-9px' }}>
              <IconButton
                onClick={() => {
                  setSiteToEdit(site)
                  toggleEditor()
                }}
              >
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
              <IconButton onClick={() => setDeleteOpen(true)}>
                <Icon icon='tabler:trash' fontSize={20} />
              </IconButton>
            </Typography>
          </Box>

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0
              }
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <CustomTimelineDot skin='light' color='primary'>
                  <Icon icon='tabler:arrow-fork' fontSize={14} />
                </CustomTimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ mt: '7px' }}>CheckinVicinity : {site?.maxCheckinVicinity || 0}</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <CustomTimelineDot skin='light' color='primary'>
                  <Icon icon='tabler:location' fontSize={14} />
                </CustomTimelineDot>
              </TimelineSeparator>
              <TimelineContent sx={{ mt: '7px' }}>QrCode :{site?.qrCode}</TimelineContent>
            </TimelineItem>
          </Timeline>
        </AccordionDetails>
      </Accordion>

      {/* ! dialog */}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <CustomCloseButton aria-label='close' onClick={() => setDeleteOpen(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            Are you sure you want to delete this sites <br />
            <span style={{ fontWeight: 'bold' }}>{site?.name}</span>
          </Typography>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {mutation.isPending ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={() => mutation.mutate()}>
                Yes
              </Button>
              <Button variant='contained' onClick={() => setDeleteOpen(false)}>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      {/* <AddDrawer open={editOpen} toggle={() => setEditOpen(p => !p)} row={site} fetchData={fetchData} /> */}
    </div>
  )
}

export default AccordionItem
