import React, { createRef, useEffect, useState } from 'react'
import { Button, Grid, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import CustomTextField from 'src/@core/components/mui/text-field'
// import BASE_URL from 'src/constant/Constant'
import toast from 'react-hot-toast'

const FormBuilder = () => {
  const questionData = JSON.parse(localStorage.getItem('rowData'))
  const editTrue = JSON.parse(localStorage.getItem('isEdit')) ?? false
  const fb = createRef()
  const [formData, setFormData] = useState('')
  const [formBuilder, setFormBuilder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(questionData?.name || '')
  const [questionid, setQuestionId] = useState(questionData?.id || '')

  const { t } = useTranslation()
  const router = useRouter()
  useEffect(() => {
    // Check if window is defined before using jQuery and formBuilder
    if (typeof window !== 'undefined') {
      window.jQuery = require('jquery')
      window.$ = window.jQuery

      require('jquery-ui-sortable')
      require('formBuilder')
    }

    // Rest of your useEffect code
    // Make sure to properly handle dependencies if needed
  }, [])
  useEffect(() => {
    // if (editTrue && questionData) {
    //   setName(questionData.name)
    //   setQuestionId(questionData.id)
    //   if (!formBuilder || !formBuilder.formData) {
    //     const initialFormData = questionData.content || []
    //     setFormData(initialFormData)
    //     setFormBuilder(
    //       $(fb.current).formBuilder({
    //         disabledActionButtons: ['data', 'clear', 'save'],
    //         formData: initialFormData
    //       })
    //     )
    //   }
    // } else {
      if (!formBuilder || !formBuilder.formData) {
        setFormBuilder(
          $(fb.current).formBuilder({
            disabledActionButtons: ['data', 'clear', 'save'],
            formData: []
          })
        )
      }
    // }
  }, [])

  async function saveData() {
    setFormData(formBuilder.formData)
    editTrue ? handleUpdateQuestionnaires() : handleAddQuestionnaires()
  }

  function clearData() {
    formBuilder.actions.clearFields()
    setFormData([])
    setName('')
    setQuestionId('')
  }

  // const handleAddQuestionnaires = async () => {
  //   setIsLoading(true)
  //   const userToken = localStorage.getItem('token')

  //   const bodyParams = {
  //     name: name,
  //     content: formBuilder.formData
  //   }
  //   try {
  //     const response = await fetch(`${BASE_URL}v1/questionnaire/questionnaire.createquestionnaireasync`, {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(bodyParams)
  //     })
  //     const responseData = await response.json()
  //     if (response.ok) {
  //       toast.success('Questionnaires added successfully')
  //       localStorage.removeItem('rowData')
  //       router.push('/apps/questionnaires')
  //     } else {
  //       toast.error(responseData?.messages)
  //     }
  //   } catch (error) {
  //     toast.error('Error occurred while processing the request')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleUpdateQuestionnaires = async () => {
  //   setIsLoading(true)
  //   const userToken = localStorage.getItem('token')

  //   const bodyParams = {
  //     id: questionid,
  //     name: name,
  //     content: formBuilder.formData,
  //     isActive: false
  //   }
  //   try {
  //     const response = await fetch(`${BASE_URL}v1/questionnaire/questionnaire.updatequestionnaireasync`, {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(bodyParams)
  //     })
  //     const responseData = await response.json()
  //     if (response.ok) {
  //       toast.success('Questionnaires updated successfully')
  //       localStorage.removeItem('rowData')
  //       router.push('/apps/questionnaires')
  //     } else {
  //       toast.error(responseData?.messages)
  //     }
  //   } catch (error) {
  //     toast.error('Error occurred while processing the request')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <>
      <Grid item container spacing={4}>
        <Grid item md={9} xs={12}>
          <CustomTextField
            value={name}
            fullWidth
            sx={{ mb: 4 }}
            placeholder='John Doe'
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button variant='contained' sx={{ ml: 2 }} onClick={saveData}>
                {editTrue ? t('Edit') : t('Save')}
              </Button>
              <Button variant='contained' sx={{ ml: 2 }} onClick={clearData}>
                {t('Clear')}
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item sm={12} xs={12}>
        <div
          style={{
            marginLeft: '5px',
            marginRight: '5px',
            marginTop: '30px',
            overflow: 'auto',
            height: '500px'
          }}
        >
          <div id='fb-editor' ref={fb} style={{ height: '500px' }} />
        </div>
      </Grid>
    </>
  )
}

export default FormBuilder
