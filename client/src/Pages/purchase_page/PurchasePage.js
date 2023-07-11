import style from "./PurchasePage.module.css";
import Navbar from "../../Components/NavBar";
import { useEffect, useState } from "react";
import purchase from "../../Api/purchase";
import PurchaseCard from "../../Components/PurchaseCard";
export default function PurchasePage() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const getPurchases = async () => {
      const purchases = await purchase();
      console.log(purchases);
      if (purchases) {
        setPurchases(purchases);
      }
    };

    getPurchases();
  }, []);
  return (
    <div>
      <Navbar />
      <div className={style.container} >
        {purchases.map((purchase, index) => {
         return <PurchaseCard key={index} data={purchase} />
        })}
      </div>
    </div>
  );
}
