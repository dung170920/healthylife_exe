import { Paper, Typography, Button, Stack } from "@mui/material";
import { BsCartCheckFill } from "react-icons/bs";
import { useSearchParams, Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let user = useSelector((state: any) => state.auth.auth?.user);
  return (
    <Paper
      elevation={2}
      sx={{
        textAlign: "center",
        padding: "40px",
        width: "70%",
        margin: "0 auto",

        "& .pay-icon": {
          color: "#1AC073",
          fontSize: "80px",
          margin: "0 auto",
        },
      }}
    >
      <Stack spacing={4}>
        <BsCartCheckFill className="pay-icon" />
        <Typography variant="h5">
          Bạn đã nạp thành công {formatPrice(Number(searchParams.get("price")))}
        </Typography>
        <Link to={`users/${user.id}`}>
          <Button variant="contained">Quay lại thông tin cá nhân</Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default PaymentSuccess;
