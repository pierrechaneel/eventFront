// app language context definition

import * as React from "react";

const LangCtx = React.createContext({ lang: "fr" });

const LangContext = ({ children }) => {
  const [lang, setLang] = React.useState("fr");

  return (
    <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
  );
};

export { LangCtx };
export default LangContext;
