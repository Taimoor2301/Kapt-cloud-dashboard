import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import TableHeader from './components/TableHeader'
import AddUserDrawer from './components/AddUserDrawer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import { CircularProgress } from '@mui/material'
import EditUserDrawer from './components/EditUserDrawer'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import toast from 'react-hot-toast'

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

const RowOptions = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  // query

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: id => api.post(`/users/user.deleteuserasync`, {}, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      handleRowOptionsClose()
      toast.success('User Deleted')
    },
    onError: errors => {
      console.log(errors)
      handleRowOptionsClose()
      toast.error('Request Failed')
    }
  })

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = id => {
    const confirm = window.confirm(`Confirm delete user: ${data.username}`)
    if (confirm) {
      mutation.mutate(id)
    } else {
      handleRowOptionsClose()
    }
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            data.editFn(data)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(data.id)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {mutation.isPending ? 'Deleting...' : 'Delete'}
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'firstName',
    headerName: 'User Name',
    renderCell: ({ row }) => {
      const { firstName, lastName, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {firstName + ' ' + lastName}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'isActive',
    minWidth: 170,
    headerName: 'Active',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'warning'}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Verified',
    field: 'emailConfirmed',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.emailConfirmed ? 'Yes' : 'No'}
          color={row.emailConfirmed ? 'success' : 'warning'}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'roles[0].roleName',
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.roles[0]?.roleName}
        </Typography>
      )
    }
  },

  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions data={row} />
  }
]

const UserList = ({ apiData }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [usersToShow, setUsersToShow] = useState([])
  const [itemToEdit, setItemToEdit] = useState(null)
  const [openEditUser, setOpenEditUser] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users/users.getlistofallusersasync')
  })

  useEffect(() => {
    if (data) {
      setAllUsers(data.data.data)
      setUsersToShow(data.data.data)
    }
  }, [data])

  // handle case insensitive search
  useEffect(() => {
    setUsersToShow(
      allUsers?.filter(
        el =>
          el.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.lastName.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }, [searchValue, allUsers])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {isLoading ? (
          <div className='h-full w-full grid place-content-center'>
            <CircularProgress />
          </div>
        ) : isError ? (
          <Typography>Something went wrong! Please try again.</Typography>
        ) : (
          <Card>
            <TableHeader
              value={searchValue}
              handleFilter={val => setSearchValue(val)}
              toggle={() => setAddUserOpen(p => !p)}
            />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={usersToShow?.map(el => ({
                ...el,
                editFn: data => {
                  setItemToEdit(data)
                  setOpenEditUser(true)
                }
              }))}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        )}
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={() => setAddUserOpen(p => !p)} />
      <EditUserDrawer open={openEditUser} toggle={() => setOpenEditUser(p => !p)} data={itemToEdit} />
    </Grid>
  )
}

export default UserList
