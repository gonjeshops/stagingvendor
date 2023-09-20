import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import {
  addSignOnContract,
  getContractList,
} from "../../redux/actions/contracts";
import DrawSignatureModel from "../common/DrawSignatureModel";
import { b64toBlob } from "../../utils";
import { addSignature } from "../../redux/actions/employee";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../common/Loader";

const PDFView = dynamic(() => import("./pdfView"), { ssr: false });

const Contract = ({
  getContracts,
  contractsList,
  vendorSignatureForContract,
  signContract,
}) => {
  const [isOpen, toggleOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [contract_id, setContractId] = useState();
  const router = useRouter();

  useEffect(() => {
    getContracts();
  }, []);

  const list = useMemo(() => {
    return (
      (contractsList &&
        contractsList.data.map((el) => {
          return {
            contract_name: el.contract_name,
            url: el.pdf,
            id: el.id,
            vendor_signature: el.signed_contracts,
          };
        })) ||
      []
    );
  }, [contractsList]);

  const isGoToPaymentDisabled = list.every((el) => {
    return !!el.vendor_signature;
  });

  const onAccept = async (imageUrl) => {
    const formData = new FormData();
    const blobData = await b64toBlob(imageUrl);
    formData.append("attachment[]", blobData);
    setLoading(true);
    vendorSignatureForContract(formData).then((action) => {
      if (action.payload.data.status === 1) {
        const dataToSent = {
          contract_id,
          url: action.payload.data.data[0]?.original,
        };
        signContract(dataToSent).then((action) => {
          setLoading(false);
          if (action.payload.data.status === 1) {
            toast.success(action.payload.data.message);
            getContracts();
          } else {
            toast.error(action.payload.data.message);
          }
        });
      }
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="signin-contract w-100">
        <div className="top-heading">
          <h4>Sign Contract Policy</h4>
        </div>
        <div className="d-flex row justify-content-center">
          {list?.map((item, index) => {
            return (
              <div className="contract_doc" key={`key_${index}`}>
                <h5>{item.contract_name}</h5>
                <PDFView url={item.url} />
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#contract-popup"
                  className="btn contract-btn mt-5"
                  onClick={() => {
                    toggleOpen(!isOpen);
                    setContractId(item.id);
                  }}
                  disabled={!!item?.vendor_signature}
                >
                  Sign Contract
                </button>
              </div>
            );
          })}
        </div>
        <DrawSignatureModel
          isOpen={isOpen}
          onClose={() => {
            toggleOpen(!isOpen);
          }}
          onSave={onAccept}
        />
      </div>
      <div className="go_payment">
        <button
          className={!isGoToPaymentDisabled && "disabled"}
          disabled={!isGoToPaymentDisabled}
          onClick={() => {
            router.push("/payment");
          }}
        >
          go to payment
        </button>
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    contractsList: state.contract.contractsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContracts: (data) => {
      return dispatch(getContractList(data));
    },
    vendorSignatureForContract: (data) => {
      return dispatch(addSignature(data));
    },

    signContract: (data) => {
      return dispatch(addSignOnContract(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
