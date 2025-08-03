import vendorApi from "@/pages/vendor/functions/vendorApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function BidsInfoPreview() {
  const [data, setData] = useState<any>("");
  const { id } = useParams();
  const getListingInfo = async () => {
    try {
      const response = await vendorApi.get("/bids/preview/" + id);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error: any) {
      toast(error.message);
    }
  };
  useEffect(() => {
    getListingInfo();
  }, []);
  return <div>{data.id}</div>;
}

export default BidsInfoPreview;
