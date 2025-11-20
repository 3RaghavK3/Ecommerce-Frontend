import { AlertToast, SuccessToast } from "@/components/Toast";
import { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [toast, setToast] = useState({ show: false, msg: "", desc: "" });
  const [alertToast, setAlert] = useState({ show: false, msg: "", desc: "" });

  const SucessDialog = ({ msg, desc }) => {
    setToast({ show: true, msg, desc });
    setTimeout(() => setToast({ show: false, msg: "", desc: "" }), 2000);
  };

  const AlertDialog = ({ msg, desc }) => {
    setAlert({ show: true, msg, desc });
    setTimeout(() => setAlert({ show: false, msg: "", desc: "" }), 2000);
  };

  return (
    <DialogContext.Provider value={{ SucessDialog, AlertDialog }}>
      {toast.show && (
        <div className="fixed top-0 right-0 m-8 z-50 ">
          <SuccessToast successmsg={toast.msg} description={toast.desc} />
        </div>
      )}
      {alertToast.show && (
        <div className="fixed top-0 right-0 m-8 z-50 ">
          <AlertToast
            alertitle={alertToast.msg}
            alertdescription={alertToast.desc}
          />
        </div>
      )}
      {children}
    </DialogContext.Provider>
  );
}
