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
import AddDrawer from 'src/views/apps/dashboard/list/AddDrawer'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import BASE_URL from 'src/constant/Constant'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles'

import AddRouteDrawer from './AddRouteDrawer'
import Dialog from '@mui/material/Dialog'

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

const AccordionItem = ({
  index,
  bustStop,
  openAccordion,
  handleAccordionChange,
  handleSiteNameClick,
  totalSites,
  fetchdataroute
}) => {
  const [editOpen, setEditOpen] = useState(false)
  const [siteOpen, setSiteOpen] = useState(false)
  const [deleteData, setdeleteData] = useState({})
  const [routeid, setrouteId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const togglesiteDrawer = id => {
    setSiteOpen(!siteOpen)
    setrouteId(id)
  }

  const toggleEditDrawer = id => {
    setEditOpen(!editOpen)
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Accordion expanded={openAccordion === index} onChange={handleAccordionChange(index)}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
        >
          <div style={{ height: '15px', width: '15px', marginTop: '9px' }}>
            <img
              src={
                bustStop?.markerIcon instanceof Blob
                  ? URL.createObjectURL(bustStop?.markerIcon)
                  : bustStop?.markerIcon && `data:image/png;base64,${bustStop?.markerIcon}`
              }
              alt='icon'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
              onError={e => console.error('Image load error:', e)}
            />
          </div>
          {/* <Icon icon='tabler:bus-stop' style={{ marginTop: '10px' }} fontSize={20} /> */}
          <Button
            variant='text'
            sx={{ cursor: 'pointer', ml: '5px' }}
            onClick={() => handleSiteNameClick(bustStop?.sites)}
          >
            {bustStop?.name}
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: 'text.secondary' }}>Route Info</Typography>
            <Typography sx={{ marginTop: '-9px' }}>
              <IconButton onClick={toggleEditDrawer}>
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
              <IconButton onClick={() => handledeletedData(bustStop)}>
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
              <TimelineContent sx={{ mt: '7px' }}>
                <Typography sx={{ display: 'flex', mr: 2, mb: 2 }} variant='h6'>
                  Color:{' '}
                  <Box
                    sx={{
                      bgcolor: `${bustStop?.color}`,
                      width: 50,
                      height: 20,
                      marginLeft: '25px',
                      borderRadius: '15%'
                    }}
                  />
                </Typography>

                <Typography
                  variant='caption'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'text.primary',
                    fontSize: '14px'
                  }}
                >
                  <span>Sites: {bustStop?.sites?.length}</span>
                  {/* <IconButton onClick={toggleEditDrawer}>
                    <Icon icon='tabler:square-rounded-plus' fontSize={20} />
                  </IconButton> */}
                  <Button
                    variant='contained'
                    style={{ marginRight: '-15px', fontSize: '14px', padding: '10px' }}
                    onClick={() => togglesiteDrawer(bustStop.id)}
                  >
                    Add site
                  </Button>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={deleteopen}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <CustomCloseButton aria-label='close' onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            Are you sure you want to delete this route <br />{' '}
            <span style={{ fontWeight: 'bold' }}>{deleteData?.name}</span>
          </Typography>
        </DialogContent>
        <DialogContent>
          <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '100px', width: '100px' }}>
              <img
                src='/images/icons/project-icons/trashimage.png'
                alt='abc'
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={handleDelete}>
                Yes
              </Button>
              <Button variant='contained' onClick={handleClose}>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <AddDrawer open={siteOpen} toggle={togglesiteDrawer} id={routeid} />
      <AddRouteDrawer open={editOpen} row={bustStop} toggle={toggleEditDrawer} fetchdataroute={fetchdataroute} />
    </div>
  )
}

export default AccordionItem
