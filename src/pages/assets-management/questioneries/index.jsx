import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import { styled } from '@mui/system'
import { CircularProgress } from '@mui/material'
import TableHeader from './component/TableHeader'
const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.name ? row.name : ' ')}
    </CustomAvatar>
  )
}

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

const QuestionnairesList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [list, setlist] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [usersToShow, setUsersToShow] = useState([])
  const [itemToEdit, setItemToEdit] = useState(null)
  const [openEditUser, setOpenEditUser] = useState(false)
  const { t } = useTranslation()

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/questionnaire/questionnaire.getallquestionnaireasync')
  })

  useEffect(() => {
    if (data) {
      setAllUsers(data.data.data.data)
      setUsersToShow(data.data.data)
      console.log("first", allUsers)
    }
  }, [data])
  useEffect(() => {
    window.localStorage.removeItem('rowData')
  }, [])


  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)
    const filteredRows = list?.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))
    setFilteredData(filteredRows)
  }


  const router = useRouter()

  const handleAddQuestionnaires = () => {
    localStorage.setItem('isEdit', JSON.stringify(false))
    router.push('/assets-management/questioneries/component/AddNewQuestionnaires')
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 320,
      field: 'fullName',
      headerName: <Translations text='Questionnaire Name'/>,

      renderCell: ({ row }) => {
        const { name } = row

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
                {name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'content',
      headerName: <Translations text={'Content'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.content}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: <Translations text={'Actions'} />,
      renderCell: ({ row }) => {
        // localStorage.setItem('rowData', JSON.stringify(row))
        // return <RowOptions row={row} fetchData={fetchData} />
      }
    }
  ]

  return (
    <Grid item container spacing={6.5}>
      {/* <Grid item xs={12}>
        {cardData && (
          <Grid container spacing={6}>
            {cardData.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title={t('Search Filters')} /> */}
          {/* <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='10'
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>10</MenuItem>
                  <MenuItem value='admin'>25</MenuItem>
                  <MenuItem value='author'>50</MenuItem>
                  <MenuItem value='editor'>100</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent> */}
          {/* <Divider sx={{ m: '0 !important' }} /> */}
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            btntitle={'Add New Questionnaire'}
            toggle={handleAddQuestionnaires}

            // toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={allUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default QuestionnairesList
