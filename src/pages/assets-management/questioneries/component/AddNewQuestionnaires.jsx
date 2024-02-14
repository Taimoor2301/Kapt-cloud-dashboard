import { useState } from 'react'
import { Button, Grid, Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import React from 'react'
import { useTranslation } from 'react-i18next'

import dynamic from 'next/dynamic'

const DynamicFormBuilder = dynamic(() => import('./FormBuilder'), {
  ssr: false // Disable server-side rendering
})

const AddNewQuestionnaires = ({ row }) => {
  const { t } = useTranslation()

  return (
    <Grid item container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title={t('Add Questionnaire')} />
          <CardContent sx={{ margin: 0 }}>
            <Divider />
            <Typography sx={{ fontWeight: '500', fontSize: '19px', mt: '15px', mb: '20px' }}>
              {t('Form Title')}
            </Typography>

            <DynamicFormBuilder />
          </CardContent>
          {/* Move the component here to ensure it is rendered within the Card content */}
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddNewQuestionnaires
