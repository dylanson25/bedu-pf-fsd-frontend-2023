import "./style.scss";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import moment from "moment/moment";
const CardPost = ({ data }) => {
  const {
    location,
    positionRoll,
    companyName,
    createdAt,
    positionName,
    companyLogo,
  } = data;
  return (
    <Card className="card-post">
      <img className="img-company" src={companyLogo} width={50} height={50} />
      <CardContent>
        <Typography
          fontSize={14}
          variant="p"
          color="text.secondary"
          gutterBottom
        >
          {moment(createdAt).format("hh")}h ago - {positionName}
        </Typography>
        <Typography
          className="text-puesto fw-semibold"
          variant="p"
          component="div"
        >
          {positionRoll}
        </Typography>
        <Typography className="mt-2" sx={{ mb: 1.5 }} color="text.secondary">
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
