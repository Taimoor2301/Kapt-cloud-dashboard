// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const TableHeader = ({
  routesList,
  selectedRoute,
  setSelectedRoute,
  activeFilter,
  setActiveFilter,
  searchValue,
  setSearchValue,
  toggle
}) => {
  const { t } = useTranslation()

  return (
    <Grid item xs={12} md={12} p={2}>
      <Card className='shadow-sm'>
        <CardContent sx={{ margin: 0 }}>
          <Grid item sm={12} xs={12}>
            <Grid container spacing={2} justifyContent='space-between'>
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  sx={{ mb: 4 }}
                  defaultValue='Route'
                  value={selectedRoute}
                  onChange={e => setSelectedRoute(e.target.value)}
                >
                  <MenuItem value='All'>All</MenuItem>
                  {routesList?.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  sx={{ mb: 4 }}
                  value={activeFilter}
                  onChange={e => setActiveFilter(e.target.value)}
                >
                  <MenuItem value='All'>All</MenuItem>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </CustomTextField>
              </Grid>
              {/* Button */}
              <Grid item sm={3} xs={12}>
                <CustomTextField
                  sx={{ mr: 4 }}
                  fullWidth
                  placeholder='Search Site'
                  onChange={e => setSearchValue(e.target.value.toLowerCase())}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Box
                  sx={{
                    rowGap: 2,
                    columnGap: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'end'
                  }}
                >
                  <Button variant='contained' onClick={() => toggle()} sx={{ width: '100%' }}>
                    <Icon fontSize='1.125rem' icon='tabler:plus' />
                    {t('Add new Site')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TableHeader
