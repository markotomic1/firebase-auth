import "./widget.scss";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { ArrowDropDown } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  let data;
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  //temporary

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonIcon
            className='icon'
            style={{ color: "crimson", backgroundColor: "rgba(244,0,0,0.3)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "See all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className='icon'
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.3)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.3)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className='icon'
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.3)" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

      const lastMonthQuery = query(
        collection(db, "users"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, "users"),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      console.log(lastMonthData);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data?.title}</span>
        <span className='counter'>
          {data?.isMoney && "$"}
          {amount}
        </span>
        <span className='link'>{data?.link}</span>
      </div>
      <div className='right'>
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <ArrowDropDown /> : <ArrowDropUpOutlinedIcon />}
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
