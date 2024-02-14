// ** React Imports
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'

// import BASE_URL from 'src/pages/constant/Constant'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import resetpasswordimage from '../../../../../public/assets/images/resetpass.jpg'

import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input } from '@mui/material'
import Image from 'next/image'
import { isAsyncThunkAction } from '@reduxjs/toolkit'

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

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, row, datafetchuser } = props
  const { t } = useTranslation()
  const [roleList, setroleList] = useState([])
  const [duplicateroleList, setduplicateroleList] = useState([])
  const [role, setrole] = useState([])
  const [approved, setApproved] = useState(false)
  const [verified, setVerified] = useState(false)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userName, setUserData] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [email, setemail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [isActiveRole, setIsActiveRole] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingreset, setIsLoadingreset] = useState(false)
  const [isActive, setisActive] = useState(false)
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [emailError, setemailError] = useState('')
  const [passwordError, setpasswordError] = useState('')

  // const [isSwitch2On, setSwitch2On] = useState(false)
  const [resetpass, setresetpassword] = useState(false)
  const [file, setFile] = useState('')
  const [uploadImage, setuploadImage] = useState('')

  const handleUserSwitchChange = () => {
    setIsActiveUser(prevIsActiveRole => !prevIsActiveRole)
  }

  // const handleRoleSwitchChange = () => {
  //   setIsActiveRole(prevIsActiveRole => !prevIsActiveRole)

  // }

  // const handleCloseResetPassword = () => setresetpassword(false)
  // const handleResetPasswordOpen = () => setresetpassword(true)

  // const handleImageChange = event => {
  //   const file = event.target.files[0]

  //   if (file) {
  //     if (file.size > 2 * 1024 * 1024) {
  //       toast.error('File size should not exceed 2 MB')

  //       return
  //     } else {
  //       setFile(file)
  //       handleImageUpload(file)
  //     }
  //   }
  // }

  // const handleImageUpload = async file => {
  //   try {
  //     const formData = new FormData()
  //     formData.append('File', file)
  //     const userToken = localStorage.getItem('token')

  //     const response = await fetch(`${BASE_URL}v1/file/file.uploadfileasync`, {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${userToken}`

  //         // 'Content-Type': 'multipart/form-data'
  //       },
  //       body: formData
  //     })

  //     const responseData = await response.json()

  //     if (responseData?.success === true) {
  //       setuploadImage(responseData?.data)
  //     } else {
  //       setFile(new File([], ''))
  //       toast.error(responseData?.message)
  //     }
  //   } catch (error) {
  //     toast.error(`Error: ${error.message}`)
  //   }
  // }

  const handleCloseResetPassword = () => setresetpassword(false)
  const handleResetPasswordOpen = () => setresetpassword(true)

  const handleImageChange = event => {
    const file = event.target.files[0]('image upload', file)

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2 MB')

        return
      } else {
        setFile(file)
        handleImageUpload(file)
      }
    }
  }

  const handleImageUpload = async file => {
    try {
      const formData = new FormData()
      formData.append('File', file)

      const response = await fetch(`${BASE_URL}file/file.uploadfileasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          tenant: 'root',
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })

      const responseData = await response.json()

      if (responseData?.success === true) {
        setuploadImage(responseData)

        // handleCloseResetPassword()
        // toast.success('POST request successful!')
      } else {
        setFile(new File([], ''))
        toast.error(responseData?.message)
      }
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
    }
  }

  const handleApproved = () => {
    setApproved(!approved)
  }

  // const handleselectRole = value => {
  //   const updatedRoles = value.map(role => {
  //     if (role.enabled === false) {
  //       role.enabled = true
  //     }})

  const handleselectRole = value => {
    const updatedRoles = value?.map(role => {
      if (role?.enabled === false) {
        role.enabled = true
      }

      return role
    })

    setrole(updatedRoles)
  }

  // const handleDelete = chipToDelete => event => {
  //   // Prevent the default behavior of the event
  //   event.preventDefault()

  //   // Assuming you have a state variable named role
  //   const updatedRoles = role.map(r => {
  //     if (r.roleId === chipToDelete.roleId) {
  //       return { ...r, enabled: false } // Update the enabled property
  //     }

  //     return r
  //   })

  //   setrole(updatedRoles)
  // }
  const handleDelete = deletedRole => event => {
    event.preventDefault()
    const updatedRoles = role?.filter(r => r.roleId !== deletedRole.roleId)
    setrole(updatedRoles)
  }

  const handledropdown = value => {}

  const handleVerified = () => {
    setVerified(!verified)
  }

  const handleSendResetLink = async () => {
    setIsLoadingreset(true)
    try {
      const postData = {
        email: email
      }

      const response = await fetch(`${BASE_URL}v1/users/users.forgotpasswordasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          tenant: 'root',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      if (responseData?.success === true) {
        handleCloseResetPassword()
        toast.success('POST request successful!')
      } else {
        toast.error(responseData?.exception)
        setIsLoadingreset(true)
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  }

  const handleSwitch1Change = () => {
    setisActive(prevIsActive => {
      return !prevIsActive
    })
  }

  const handleupdate = async () => {
    setIsLoading(true)
    const userToken = localStorage.getItem('token')

    const postData = {
      firstName: firstName,
      lastName: lastName,
      imageUrl: uploadImage,
      email: email,

      // password: password,
      // confirmPassword: confirmPassword,

      phoneNumber: phoneNumber,
      isActive: isActiveUser,
      userRoles: []
    }

    const duplicateList = roleList?.map(({ permissions, ...rest }) => ({
      ...rest,
      enabled: false
    }))

    const updatedDuplicateList = duplicateList?.map(item => {
      const isMatchingId = role?.some(roleItem => roleItem.roleId === item.id)

      if (isMatchingId) {
        return {
          ...item,
          enabled: true
        }
      }

      return item
    })

    updatedDuplicateList?.forEach(singleRole => {
      postData.userRoles.push({
        roleId: singleRole.id,
        roleName: singleRole.name,
        description: singleRole.description,
        enabled: singleRole.enabled,
        isActive: isActive
      })
    })

    try {
      const response = await fetch(`${BASE_URL}v1/users/user.updateuserasync?id=${row.id}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      if (response.ok) {
        toast.success('update  successfully')
      } else {
        toast.error(responseData.messages)
      }
      datafetchuser()
      handleClose()
    } catch (error) {
      toast.error('Error occurred while processing the request')
    } finally {
      setIsLoading(false) // Set loading to false after receiving the response
    }
  }

  const handleAddUser = async () => {
    setIsLoading(true)
    const userToken = localStorage.getItem('token')
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error('All fields are required')

      return
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match')

      return
    }
    setIsLoading(true)

    const postData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber,
      imageUrl: uploadImage
    }

    try {
      const response = await fetch(`${BASE_URL}v1/users/users.createnewuserasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      if (response?.ok) {
        toast.success('User added successfully')
      } else {
        toast.error(responseData?.messages)
      }
      datafetchuser()

      handleClose()
    } catch (error) {
      toast.error('Error occurred while processing the request')
    } finally {
      setIsLoading(false) // Set loading to false after receiving the response
    }
  }

  const handleClose = () => {
    handleCloseResetPassword()
    toggle()

    // handlereset()

    // datafetchuser()
  }

  const handlereset = () => {
    setlastName('')
    setfirstName('')
    setUserData('')
    setemail('')
    setpassword('')
    setconfirmPassword('')
    setphoneNumber('')
    setrole([])
    setFile(new File([], ''))
  }

  // ...

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${BASE_URL}v1/roles/roles.getlistofrolesasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setroleList(result.data)
      setduplicateroleList(result.data) // Corrected function call
    } catch (error) {
      toast.error(error)
    }
  }

  const fetchDataimage = async data => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(
        `${BASE_URL}v1/file/file.downloadfileasync?FileName=0ccd3f16-7ca8-46ff-a8d5-4bad68504373.png}`,
        {
          method: 'GET',
          headers: headers
        }
      )

      const result = await response.json()
    } catch (error) {
      toast.error(error)
    }
  }

  const isValidPhoneNumber = phoneNumber => {
    // Assuming a valid phone number should have at least 10 digits
    if (!phoneNumber) {
      return 'Phone Number is required'
    }

    if (!/^\d{10,}$/.test(phoneNumber)) {
      return 'Please enter a valid phone number'
    }

    // Clear the error if the input is valid
    return ''
  }

  // Email validation function
  const isValidEmail = email => {
    if (!email) {
      return 'Email is required'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email'
    }

    // Clear the error if the input is valid
    return ''
  }

  const isValidPassword = password => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 6) {
      return 'atleast 6 digits'
    }

    return ''
  }

  // ...

  React.useEffect(() => {
    fetchData()
  }, [])

  React.useEffect(() => {
    if (row) {
      fetchDataimage(row?.imageUrl)
    }
  }, [row])

  React.useEffect(() => {
    if (row) {
      setfirstName(row?.firstName)
      setlastName(row?.lastName)
      setemail(row?.email)
      setUserData(row?.userName) // Set userName in edit mode
      setphoneNumber(row?.phoneNumber)
      setFile(row?.imageUrl) // Set userName in edit mode

      // Assuming row.roles is an array
      setrole([...row.roles])
      setIsActiveUser(row.isActive)
      setuploadImage(row.imageUrl)
    } else {
      handlereset()
    }
  }, [row])
  useState(() => {
    setFile(new File([], ''))
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{row ? t('Update User') : t('Add User')}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <Grid item>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: '10px',
              marginLeft: '10px'
            }}
          >
            <Avatar
              alt='Selected Image'
              src={file instanceof Blob ? URL.createObjectURL(file) : file && `data:image/png;base64,${file}`}
              sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
              onError={e => console.error('Image load error:', e)}
            />
          </div>

          <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleImageChange} />
            <Button variant='contained' color='primary' component='span'>
              Choose Image
            </Button>
          </label>
        </Grid>
        {/* <Box sx={{ mb: 4, padding: '15px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '100px', width: '100px' }}>
            <img
              src={file instanceof Blob ? URL.createObjectURL(file) : file && `data:image/png;base64,${file}`}
              alt='abc'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
              onError={e => console.error('Image load error:', e)}
            />
          </div>
          <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleImageChange} />
            <Button variant='contained' color='primary' component='span'>
              Choose Image
            </Button>
          </label>
        </Box> */}
        <CustomTextField
          fullWidth
          value={firstName}
          sx={{ mb: 4, mt: 4 }}
          label={t('First Name')}
          onChange={e => setfirstName(e.target.value)}
          placeholder='John'
        />

        <CustomTextField
          fullWidth
          value={lastName}
          sx={{ mb: 4 }}
          label={t('Last Name')}
          onChange={e => setlastName(e.target.value)}
          placeholder='Doe'
        />
        {row?.emailConfirmed ? (
          ''
        ) : (
          <>
            <CustomTextField
              fullWidth
              type='email'
              label={t('Email')}
              value={email}
              sx={{ mb: 4 }}
              onChange={e => {
                setemail(e.target.value)
                setemailError(isValidEmail(e.target.value))
              }}
              placeholder='johndoe@email.com'
              error={!!emailError}
              helperText={emailError}
            />
          </>
        )}
        <>
          {row ? (
            ''
          ) : (
            <>
              <CustomTextField
                fullWidth
                value={password}
                sx={{ mb: 4 }}
                label={t('Password')}
                onChange={e => {
                  setpassword(e.target.value)
                  setpasswordError(isValidPassword(e.target.value))
                }}
                placeholder='123'
                error={!!passwordError}
                helperText={passwordError}
              />

              <CustomTextField
                fullWidth
                value={confirmPassword}
                sx={{ mb: 4 }}
                label={t('Confirm Password')}
                onChange={e => {
                  setconfirmPassword(e.target.value)
                  setpasswordError(isValidPassword(e.target.value))
                }}
                placeholder='123'
                error={!!passwordError}
                helperText={passwordError}
              />
            </>
          )}

          <CustomTextField
            fullWidth
            value={phoneNumber}
            sx={{ mb: 2 }}
            label={t('Phone Number')}
            onChange={e => {
              setphoneNumber(e.target.value)
              setPhoneNumberError(isValidPhoneNumber(e.target.value))
            }}
            placeholder='123'
            error={!!phoneNumberError}
            helperText={phoneNumberError}
          />
        </>

        {row ? (
          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id='demo-multiple-chip-label'>Role</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple
              value={role}
              onChange={e => handleselectRole(e.target.value)}
              input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
              renderValue={selected => (
                <Box
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                  SelectProps={{ value: role, onChange: e => handledropdown(e.target.value) }}
                >
                  {selected?.map(
                    value =>
                      value.enabled && (
                        <Chip
                          key={value.roleId}
                          label={value.roleName}
                          onMouseDown={event => {
                            event.stopPropagation()
                          }}
                          onDelete={event => handleDelete(value)(event)}
                        />
                      )
                  )}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {roleList?.map(item => (
                <MenuItem
                  key={item.id}
                  value={{
                    roleId: item.id,
                    roleName: item.name,
                    description: item.description,
                    enabled: false
                  }}
                  disabled={role.some(role => role.roleId === item.id && role.enabled === true)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ''
        )}

        <Grid container spacing={2}>
          {/* Switch for Active User */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {row ? (
                <>
                  <Switch
                    checked={isActiveUser}
                    onChange={handleUserSwitchChange}
                    inputProps={{ 'aria-label': 'user-controlled' }}
                    label={
                      <span>
                        <Typography component='span' level='inherit' sx={{ ml: '10px' }}>
                          {isActiveUser ? 'On' : 'Off'}
                        </Typography>
                      </span>
                    }
                    sx={{
                      '--Switch-thumbSize': '27px',
                      '--Switch-trackWidth': '100px',
                      '--Switch-trackHeight': '45px'
                    }}
                  />
                  <Typography sx={{ ml: 2 }}>{isActiveUser ? 'Active User' : 'InActive User'}</Typography>
                </>
              ) : (
                ''
              )}
            </Box>
          </Grid>

          {/* Switch for Active Role */}
          {/* <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Switch
                checked={isActiveRole}
                onChange={handleRoleSwitchChange}
                inputProps={{ 'aria-label': 'role-controlled' }}
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '100px',
                  '--Switch-trackHeight': '45px'
                }}
              />
              <Typography sx={{ ml: 2 }}>{isActiveRole ? 'Active Role' : 'InActive Role'}</Typography>
            </Box>
          </Grid> */}
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* here is switch code */}

          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              {row ? (
                <>
                  {' '}
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ mr: 3, p: 3, pt: 3, pb: 3 }}
                    style={{ textAlign: 'start', fontSize: '12.7px' }}
                    onClick={handleResetPasswordOpen}
                  >
                    Reset Password
                  </Button>
                  <Dialog
                    open={resetpass}
                    onClose={handleCloseResetPassword}
                    aria-labelledby='customized-dialog-title'
                    sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
                  >
                    <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
                      <CustomCloseButton aria-label='close' onClick={handleCloseResetPassword}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </CustomCloseButton>
                    </DialogTitle>
                    <DialogContent>
                      <Typography style={{ textAlign: 'center' }}>
                        Are you sure you want to reset your password<br></br>{' '}
                        <span style={{ fontWeight: 'bold' }}>{row?.email}</span>
                      </Typography>
                    </DialogContent>
                    <DialogContent>
                      <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ height: '150px', width: '150px' }}>
                          <Image
                            src={resetpasswordimage}
                            alt='reset password'
                            style={{
                              height: '100%',
                              width: '100%'
                            }}
                          />
                        </div>
                      </Box>
                    </DialogContent>

                    <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {isLoadingreset ? (
                        <CircularProgress />
                      ) : (
                        <>
                          <Button variant='contained' onClick={handleSendResetLink}>
                            Yes
                          </Button>
                          <Button variant='contained' onClick={handleCloseResetPassword}>
                            No
                          </Button>
                        </>
                      )}
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                ''
              )}
              <Button
                type='submit'
                variant='contained'
                sx={{ mr: 3 }}
                onClick={row ? () => handleupdate(uploadImage) : handleAddUser}
              >
                {row ? t('Update') : t('Submit')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                {t('Cancel')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
