import "./style.scss";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
const CardPost = ({ data }) => {
  const { location, positionType, companyName, createdAt, positionModalType } =
    data;
  return (
    <Card className="card-post">
      <CardContent>
        <Typography variant="p" color="text.secondary" gutterBottom>
          {createdAt} - {positionModalType}
        </Typography>
        <Typography
          className="text-puesto fw-semibold"
          variant="p"
          component="div"
        >
          {positionType}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {companyName}
        </Typography>
        <CardActions>
          <Typography variant="body2" color={purple[300]}>
            {location}
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default CardPost;
