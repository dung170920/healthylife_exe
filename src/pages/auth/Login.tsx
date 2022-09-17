
import React from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, styled } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';


const theme = createTheme();
const DivContainner = styled('div')(({ theme }) => ({
   width: '100%',
   height:'100%',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column'  
 }));

 const DivHeader = styled('div')(({ theme }) => ({
   width: '100%',
   height:'15%',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center'
 }));

 const DivDangNhap = styled('div')(({ theme }) => ({
   width: '100%',
   height:'100%',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   marginLeft: '20px',
   marginTop: '15px',
   fontSize: '150%',
   fontWeight: '600'
 }));

 const DivForm = styled('div')(({ theme }) => ({
   width: '100%',
   height:'100%',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   marginLeft: '20px',
   fontSize: '110%',

 }));


 const DivContent = styled('div')(({ theme }) => ({
   width: '100%',
   height:'85%',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center'
 }));

 const ButtonDangNhap = styled(Button)(({ theme }) => ({
   padding: "6px 16px",
   height: "36px",
   width: "100%",
   borderRadius: '4px',
   border: "1px solid ",
   backgroundColor: "#1AC073",
   color: '#FFF',
   marginTop: '24px',
   marginBottom: '16px',
   ":hover": {
      backgroundColor: "#B5B5BE",
    },
 }));

 const ButtonDangNhapGoogle = styled(Button)(({ theme }) => ({
   padding: "6px 16px",
   height: "36px",
   width: "100%",
   borderRadius: '4px',
   backgroundColor: "#FC5A5A",
   color: '#FFF',
   marginTop: '24px',
   marginBottom: '16px',
   ":hover": {
      backgroundColor: "#B5B5BE",
    },
 }));

 const InstantLogin = styled('div')(({ theme }) => ({
   color: '#B5B5BE',
   padding: "6px 16px",
   fontSize: '60%'

 }));

 
const Login = () => {
  return( 
   <ThemeProvider theme={theme}>
      <DivContainner>
         <DivHeader>
            <DivDangNhap>
               Đăng nhập
            </DivDangNhap>
         </DivHeader>
         <DivContent>
            <DivForm>
               <Box component="form" sx={{m: '0'}} >
                  <label>
                     Email
                  </label>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     placeholder="Nhập email"
                     name="email"
                     autoComplete="email"
                     autoFocus
                  />
                  <label>
                     Mật khẩu
                  </label>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     placeholder="Nhập mật khẩu"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                  />
                  <Grid container>
                     <Grid item xs>
                        <FormControlLabel
                           control={<Checkbox value="remember" color="success" />}
                           label="Nhớ tài khoản"
                        />
                     </Grid>
                     <Grid item  sx={{display: "flex",
                                    alignItems: "center"}}>
                        <Link href="#" variant="body1">
                           Quên mật khẩu
                        </Link>
                     </Grid>
                  </Grid>
                  <ButtonDangNhap
                  >
                     Đăng nhập
                  </ButtonDangNhap>
                  <InstantLogin>
                     ----------------------------Đăng nhập với---------------------------
                  </InstantLogin>
                  <ButtonDangNhapGoogle

                  >
                     Đăng nhập với Google
                  </ButtonDangNhapGoogle>
               </Box>
            </DivForm>
         </DivContent>
      </DivContainner>
   </ThemeProvider>
)};

export default Login;
