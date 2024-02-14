import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TableRow from '@mui/material/TableRow'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'

// import RowOptions from 'src/views/apps/user/userManagement/list/RowOptions'
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
  if (row.imageUrl) {
    return <CustomAvatar src={row.imageUrl} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.firstName ? row.firstName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const ViewUserModel = ({ row }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [deleteopen, setdeleteOpen] = useState(false)
  const handleClickdeleteOpen = () => setdeleteOpen(true)
  const handleClose = () => setdeleteOpen(false)

  const { t } = useTranslation()

  const handleClickOpen = () => {
    setOpen(!open)
  }

  // ! mutation
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: id => api.post(`/users/user.deleteuserasync`, {}, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success('User Deleted')
      handleClose()
      handleClickOpen()
    },
    onError: errors => {
      toast.error('Request Failed')
      console.log(errors)
      setdeleteOpen(false)
    }
  })

  function handleDelete() {
    mutation.mutate(row.id)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderClient(row)}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography
            noWrap
            onClick={handleClickOpen}
            sx={{
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {row.firstName + ' ' + row.lastName}
          </Typography>
          <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
            {row.email}
          </Typography>
        </Box>
      </Box>{' '}
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby='customized-dialog-title'
        className='cursor-pointer'
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
                  <Button
                    onClick={() => {
                      row.editFn(row)
                      setOpen(false)
                    }}
                  >
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

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {mutation.isPending ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={() => handleDelete()}>
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
