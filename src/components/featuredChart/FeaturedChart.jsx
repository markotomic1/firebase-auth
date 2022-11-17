import "./featuredChart.scss";
import { MoreVert } from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const FeaturedChart = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Revenue</h1>
        <MoreVert fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={70} text='70' strokeWidth={3} />
        </div>
        <p className='title'>Total sales made today</p>
        <p className='amount'>$420</p>
        <p className='desc'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt,
          dolorum!
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Target</div>
            <div className='itemResult negative'>
              <KeyboardArrowDown fontSize='small' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Last Week</div>
            <div className='itemResult positive'>
              <KeyboardArrowUp fontSize='small' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle '>Last Month</div>
            <div className='itemResult positive'>
              <KeyboardArrowUp fontSize='small' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
