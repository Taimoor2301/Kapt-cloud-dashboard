// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, btntitle, toggle, value } = props
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end',
        '@media screen and (max-width: 600px)': {
          justifyContent: 'center', // Center items for screens smaller than 600px
          textAlign: 'center' // Center text in CustomTextField for small screens
        }
      }}
    >
      {/* <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />}>
        {t('Export')}
      </Button> */}
      {/* <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          textAlign: 'right',
          justifyContent: 'end'
        }}
      > */}
      <CustomTextField
        value={value}
        sx={{ mr: 4 }}
        placeholder={t('Search...')}
        onChange={e => handleFilter(e.target.value)}
      />

      <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        {`${t(btntitle)}`}
      </Button>
      {/* </Box> */}
    </Box>
  )
}

export default TableHeader
