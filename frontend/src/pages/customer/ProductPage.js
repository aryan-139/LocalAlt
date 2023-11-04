import { Box, Button, Rating, Typography, Card } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProductWithId } from '../../api/productApis'
import HeaderProgress from '../../components/HeaderProgress'
import AuthContext from '../../context/AuthContext'

const ProductPage = () => {

  const { id } = useParams()
  const [data, setData] = useState({})
  const { user, setUser } = useContext(AuthContext);


  useEffect(() => {

    getSingleProductWithId({ id }).then((res) => {

      if (res.isError) {
        alert('Error Occurred!')
      } else {
        setData(res)
      }
    })
    console.log(user);

  }, [])


  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {data == {} ? <HeaderProgress /> :


        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { "md": '1fr 1fr', "sm": '1fr' },
          }}>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'

          }}>

            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mb: '1rem' }}>
              <img src={data?.images?.[0]} alt='product_image'
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }} />
            </Box>

            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              gap: '1rem',
              width: { "md": '70%', "xs": '100%', "sm": '100%' }
            }}>

              <Typography variant='body'>Seller</Typography>
              {/* <Typography variant='h6'>{data?.store_name + data?.locality}</Typography> */}

              <Box sx={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                justifyContent: 'space-between'
              }}>

                <Box

                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${data?.store_lat}%2C${data?.store_lon}`, '_blank')}

                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    backgroundColor: 'background.main',
                    padding: '0.25rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                  <span class="material-symbols-outlined">
                    pin_drop
                  </span>
                  <Typography>Locate Store</Typography>

                </Box>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backgroundColor: 'background.main',
                  padding: '0.25rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <span class="material-symbols-outlined">
                    call
                  </span>
                  <Typography>Call Store</Typography>

                </Box>

              </Box>



            </Card>

          </Box>



          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: { "md": "0rem", "sm": "5rem", "xs": '5rem' }
          }}>
            <Typography variant='h5' sx={{ fontWeight: '500' }}>{data?.product_name}</Typography>
            <Typography>{data?.subtitle}</Typography>
            <Rating value={data?.rating} />
            <Typography sx={{
              fontSize: '0.75rem',
              backgroundColor: 'background.main',
              width: 'max-content',
              padding: '0.1rem 1rem',
              borderRadius: '2rem'
            }}>{data?.category}</Typography>
            <Typography variant='h4'>₹{data?.price}</Typography>

            <Box sx={{
              mt: '1rem',
              display: 'flex',
              gap: '1rem'
            }}>


              <Button variant={'contained'} sx={{
                width: 'max-content'
              }}>Buy Now</Button>
              <Button variant={'outlined'} sx={{
                width: 'max-content'
              }}>Visit Store</Button>

            </Box>

            <Typography mt={'2rem'}>{data?.description}</Typography>


          </Box>

        </Box>

      }

    </Box>

  )
}

export default ProductPage