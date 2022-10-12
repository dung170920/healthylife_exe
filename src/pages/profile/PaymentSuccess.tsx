import { Stack, Typography, Button } from "@mui/material";
import { BsCartCheckFill } from "react-icons/bs";
import { useSearchParams, Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let user = useSelector((state: any) => state.auth.auth?.user);
  return (
    <Stack justifyContent="center" sx={{ fontSize: "40px" }}>
      <BsCartCheckFill />
      <Typography variant="h4">
        Bạn đã nạp thành công{" "}
        {formatPrice(Number(searchParams.get("searchParams")))}
      </Typography>
      <Link to={`users/${user.id}`}>
        <Button variant="contained">Quay lại thông tin cá nhân</Button>
      </Link>
    </Stack>
  );
};

export default PaymentSuccess;
