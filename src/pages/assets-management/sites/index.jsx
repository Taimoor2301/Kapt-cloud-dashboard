import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableHeader from './components/TableHeader'
import { useQuery } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import AccordionItem from './components/AccordinaItem'
import AddSiteDrawer from './components/AddSiteDrawer'
import EditSiteDrawer from './components/EditSiteDrawer'
import dynamic from 'next/dynamic'
import { Flag } from '@mui/icons-material'

const LeafletMapcomponents = dynamic(
  () => import('./components/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

export default function Sites() {
  // routes
  const [selectedRoute, setSelectedRoute] = useState('All')

  // sites
  const [activeFilter, setActiveFilter] = useState('All')
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [allSites, setAllSites] = useState([])
  const [sitesToShow, setSitesToSHow] = useState([])

  // edit site
  const [editSiteOpen, setEditSiteOpen] = useState(false)
  const [siteToEdit, setSiteToEdit] = useState(null)

  // cities
  const [flag, setflag] = useState(false)
  const [selectedCity, setSelectedCity] = useState({})

  const { data: routes } = useQuery({
    queryFn: () => api.get('/routes/route.getallrouteasync'),
    queryKey: ['routes']
  })

  const {
    data: sites,
    isLoading: sitesLoading,
    isError: sitesError
  } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  useEffect(() => {
    setAllSites(sites?.data?.data?.data)
    setSitesToSHow(sites?.data?.data?.data)
  }, [sites])

  useEffect(() => {
    setSitesToSHow(allSites?.filter(site => site.name.toLowerCase().includes(searchValue)))
  }, [searchValue, allSites])

  // change active or inactive
  useEffect(() => {
    if (activeFilter === 'All') {
      return setSitesToSHow(
        selectedRoute === 'All' ? allSites : allSites.filter(site => site.route.id === selectedRoute)
      )
    }
    setSitesToSHow(
      allSites.filter(
        site => site.isActive === activeFilter && (site.route.id === selectedRoute || selectedRoute === 'All')
      )
    )
  }, [activeFilter, allSites, selectedRoute])

  // change route
  useEffect(() => {
    setActiveFilter('All')
    if (selectedRoute === 'All') {
      return setSitesToSHow(allSites)
    }
    setSitesToSHow(allSites.filter(site => site.route.id === selectedRoute))
  }, [selectedRoute, allSites])

  const handleCityNameClick = city => {
    setSelectedCity(city)
    setflag(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableHeader
          routesList={routes?.data?.data?.data}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggle={() => setAddDrawerOpen(p => !p)}
        />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <Card
          sx={{
            height: {
              md: 'calc(80vh - 4.0625rem)',
              xs: 'calc(50vh - 4.0625rem)'
            }
          }}
          className='m-5'
        >
          <CardContent>
            <Typography sx={{ fontSize: '16px', marginBottom: '30px' }}>
              Total Sites ({sitesToShow?.length || 0})
            </Typography>
            <div className='overflow-x-hidden overflow-y-auto max-h-[25rem]'>
              {sitesToShow?.map(site => (
                <AccordionItem
                  key={site.id}
                  site={site}
                  setSiteToEdit={setSiteToEdit}
                  handleCityNameClick={handleCityNameClick}
                  toggleEditor={() => setEditSiteOpen(true)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <LeafletMapcomponents cities={allSites} selectedCity={selectedCity} flag={flag} />
        </Card>
      </Grid>

      <AddSiteDrawer open={addDrawerOpen} route={routes?.data?.data?.data} toggle={() => setAddDrawerOpen(p => !p)} />
      <EditSiteDrawer
        open={editSiteOpen}
        route={routes?.data?.data?.data}
        toggle={() => {
          setEditSiteOpen(false)
          setSiteToEdit(null)
        }}
        site={siteToEdit}
      />
    </Grid>
  )
}
