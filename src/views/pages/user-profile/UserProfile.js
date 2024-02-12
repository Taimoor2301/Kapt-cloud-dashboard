// ** MUI Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

// ** Demo Components
import { Card, CardActions, CardContent, FormControl, Input, InputLabel, TextField } from '@mui/material'
import { Button } from '@mui/base'

const UserProfile = ({ data }) => {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4'>Profile Information</Typography>
          <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
            Update your account's profile information and email address.
          </Typography>
          <Grid container sx={{ mb: 4, mt: 5 }}>
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Avatar alt='Full Name'  sx={{ width: 80, height: 80 }} />
            </StyledBadge>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='upload-photo'
                type='file'
              />

              <label
                htmlFor='upload-photo'
                style={{
                  backgroundColor: '#EAEBEC',
                  border: 'none',
                  padding: '10px 20px',
                  color: '#BFC0C3',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '16px'
                }}
              >
                <Button
                  variant='contained'
                  component='span'
                  sx={{ border: 0 }}
                  style={{
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '17px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Select A New Photo
                </Button>
              </label>
                <Button
                  variant='contained'
                  component='span'
                  sx={{ border: 0 }}
                  style={{
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '17px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backgroundColor: '#D34C4D',
                    padding: '10px 20px',
                    color: 'white',
                    marginLeft: '10px'
                  }}
                >
                  Delete Photo
                </Button>
            </Grid>
          </Grid>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Name'
              id='outlined-size-small'
              size='small'
              fullWidth
            />
            <TextField
              label='Email'
              id='outlined-size-small'
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card style={{ marginTop: '2rem' }}>
        <CardContent>
          <Typography variant='h4'>Update Password</Typography>
          <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
            Ensure your account is using a long, random password to stay secure.
          </Typography>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Current Password'
              id='outlined-size-small'
              defaultValue='Enter a password'
              size='small'
              fullWidth
            />
            <TextField
              label='New Password'
              id='outlined-size-small'
              defaultValue='Enter a New Password'
              size='small'
              fullWidth
              style={{ marginTop: '2rem' }}
            />
            <TextField
              label='Confirm Password'
              id='outlined-size-small'
              defaultValue='Confirm Password'
              size='small'
              fullWidth
              style={{ marginTop: '2rem' }}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </>

   
  )
}

export default UserProfile
