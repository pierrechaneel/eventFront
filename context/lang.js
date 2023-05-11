// app language context definition

import * as React from "react";

const LangCtx = React.createContext({ lang: "fr" });

const LangContext = ({ children }) => {
  const [lang, setLang] = React.useState("fr");
  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState(false);

  return (
    <LangCtx.Provider
      value={{ lang, setLang, isMenuCollapsed, setIsMenuCollapsed }}
    >
      {children}
    </LangCtx.Provider>
  );
};

export { LangCtx };
export default LangContext;
