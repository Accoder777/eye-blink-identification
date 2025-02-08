import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function ContainedButtons({ name_of_button, direction }) {
  return (
    <Stack direction="row" spacing={2}>
      <Link to={`/${direction}`}>
        <Button sx={{ width: "150%", height: "150%" }} variant="contained">
          {name_of_button}
        </Button>
      </Link>
    </Stack>
  );
}
