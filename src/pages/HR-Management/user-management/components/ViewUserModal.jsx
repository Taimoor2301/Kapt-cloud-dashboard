import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import AddUserDrawer from './AddUserDrawer'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import RowOptions from 'src/views/apps/user/userManagement/list/RowOptions'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

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

const renderClient = row => {
  const name = `${row?.firstName} ${row?.lastName}`

  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{
        mr: 2.5,
        width: 38,
        height: 38,
        fontWeight: 500,
        fontSize: theme => theme.typography.body1.fontSize
      }}
    >
      {getInitials(name)}
    </CustomAvatar>
  )
}

const ViewUserModel = ({ row, datafetchuser }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteopen, setdeleteOpen] = useState(false)
  const handleClickdeleteOpen = () => setdeleteOpen(true)
  const handleClose = () => setdeleteOpen(false)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const handleClickOpen = () => {
    setOpen(!open)
  }

  const toggleEditDrawer = () => {
    setOpen(false)

    setEditOpen(!editOpen) // Toggle the Edit drawer
  }

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      setIsLoading(true)

      const response = await fetch(`${BASE_URL}users/${row.id}/admin.user.deleteuserasync`, {
        method: 'POST',
        headers: headers
      })

      const result = await response.json()

      if (response?.ok) {
        toast.success('Data deleted successfully')
        handleClose()
        datafetchuser()
      } else {
        toast.error(response?.messages)
        setIsLoading(true)
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setIsLoading(false)
    }
    handleClickOpen()
    datafetchuser()
  }

  return (
    <>
      {/* <Button>
      {/* <Button>
        <Icon color='primary' icon={'tabler:circle-plus'} fontSize={20} onClick={handleClickOpen} />
      </Button> */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderClient(row)}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography
            noWrap
            onClick={handleClickOpen}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {`${row.firstName} ${row.lastName}`}
          </Typography>
        </Box>
      </Box>{' '}
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby='customized-dialog-title'
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'visible'
          }
        }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            {t(`Details of ${row.firstName} ${row.lastName}`)}
          </Typography>
          <CustomCloseButton aria-label='close' onClick={handleClickOpen}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <TableContainer key={row.id}>
          <Table>
            <TableBody>
              <TableRow sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell>{t('User')}</TableCell>

                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                  {renderClient(row)}
                  {`${row.firstName} ${row.lastName}`}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell>{t('Email')}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell>{t('Role')}</TableCell>
                <TableCell>
                  {' '}
                  {row?.roles.map((role, index) => (
                    <Tooltip key={index} title={row?.roles?.map(r => r.roleName).join(', ')}>
                      <span style={{ display: 'inline' }}>
                        {role?.roleName}
                        {index < row.roles.length - 1 && ', '}
                      </span>
                    </Tooltip>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell>{t('Verified')}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: row.emailConfirmed
                        ? theme => theme.palette.success.main
                        : theme => theme.palette.error.main
                    }}
                  >
                    <Icon icon={row.emailConfirmed ? 'tabler:shield-check' : 'tabler:shield-x'} fontSize={24} />
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell>{t('Action')}</TableCell>
                <TableCell>
                  <Button onClick={toggleEditDrawer}>
                    <Icon icon='tabler:edit' fontSize={20} />
                  </Button>
                  <Button onClick={handleClickdeleteOpen}>
                    <Icon icon='tabler:trash' fontSize={20} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
      <AddUserDrawer open={editOpen} row={row} toggle={toggleEditDrawer} datafetchuser={datafetchuser} />
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
            Are you sure you want to delete this name<br></br>{' '}
            <span style={{ fontWeight: 'bold' }}>
              {row?.firstName} {row?.lastName}
            </span>
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
    </>
  )
}

export default ViewUserModel
